#!/usr/bin/env node
/**
 * migrate.mjs
 * 
 * Absolute Main Script to handle everything in one go.
 * Run this from inside the `apps/web` folder so it has access to @supabase/supabase-js
 *
 * Usage:
 *   cd apps/web
 *   node migrate.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');
const MIGRATIONS_DIR = path.join(ROOT, 'migrations');

// ── Read .env ──────────────────────────────────────────────────────────────────
function readEnvFile() {
  const envPath = path.join(__dirname, '.env');
  try {
    const content = readFileSync(envPath, 'utf-8');
    const vars = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      vars[key.trim()] = rest.join('=').trim();
    }
    return vars;
  } catch (e) {
    console.error("❌ Could not find or read .env file in apps/web.");
    process.exit(1);
  }
}

const env = readEnvFile();

// We need the new project details from the .env
const NEW_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const NEW_SERVICE_ROLE_KEY = env['NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'];

// Old project details (hardcoded here so you don't lose them)
const OLD_URL = 'https://simwxrfscfhtuksrbnqf.supabase.co'; // The one we just migrated FROM (or the original old one: fejytngrucuwsekeuuwr)
const OLD_SERVICE_ROLE_KEY = process.env.OLD_SERVICE_ROLE_KEY 
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbXd4cmZzY2ZodHVrc3JibnFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI1MzExMywiZXhwIjoyMDkzODI5MTEzfQ.RwGT7qHN-lGsAj6nDHFyDpY452NNDX7KR9kCxJrhZcg';

const BUCKET = 'product-images';

if (!NEW_URL || !NEW_SERVICE_ROLE_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY is missing in .env');
  process.exit(1);
}

// Extract project ref from URL
const projectRefMatch = NEW_URL.match(/https:\/\/([^.]+)\.supabase\.co/);
if (!projectRefMatch || !projectRefMatch[1]) {
  console.error('❌ Could not extract project ID from NEXT_PUBLIC_SUPABASE_URL');
  process.exit(1);
}
const projectRef = projectRefMatch[1];

// ── Helper to prompt for password ──────────────────────────────────────────────
function askPassword(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

// ── Run SQL file via Supabase Management API ───────────────────────────────────
function runSqlFile(filename) {
  const filePath = path.join(MIGRATIONS_DIR, filename);
  console.log(`\n📄 Running ${filename}...`);
  try {
    execSync(`cmd /c npx supabase db query --linked -f "${filePath}"`, { cwd: ROOT, stdio: 'inherit' });
    console.log(`✅ ${filename} completed.`);
  } catch (e) {
    console.error(`❌ ${filename} failed.`);
    throw e;
  }
}

// ── Image Copy Logic ──────────────────────────────────────────────────────────
async function copyImages() {
  console.log('\n🖼 Starting image migration...');
  console.log(`   From: ${OLD_URL}`);
  console.log(`   To:   ${NEW_URL}`);
  
  const oldSupabase = createClient(OLD_URL, OLD_SERVICE_ROLE_KEY);
  const newSupabase = createClient(NEW_URL, NEW_SERVICE_ROLE_KEY);

  async function listAllFiles(prefix = '') {
    const { data, error } = await oldSupabase.storage.from(BUCKET).list(prefix, { limit: 1000, offset: 0 });
    if (error) throw error;

    const files = [];
    for (const item of data || []) {
      if (item.metadata === null) {
        const subFiles = await listAllFiles(prefix ? `${prefix}/${item.name}` : item.name);
        files.push(...subFiles);
      } else {
        files.push(prefix ? `${prefix}/${item.name}` : item.name);
      }
    }
    return files;
  }

  let files;
  try {
    files = await listAllFiles();
  } catch (e) {
    console.error('❌ Failed to list files from old bucket:', e.message);
    return;
  }

  if (files.length === 0) {
    console.log('ℹ No files found in old bucket. Nothing to copy.');
    return;
  }

  console.log(`📁 Found ${files.length} files to copy:\n`);
  let success = 0; let failed = 0;

  for (const file of files) {
    process.stdout.write(`  Copying: ${file} ... `);
    
    const { data: blob, error: dlError } = await oldSupabase.storage.from(BUCKET).download(file);
    if (dlError) {
      console.warn(`✗ (Download failed)`);
      failed++;
      continue;
    }

    const buffer = Buffer.from(await blob.arrayBuffer());
    const ext = file.split('.').pop()?.toLowerCase();
    const mimeTypes = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
    
    const { error: upError } = await newSupabase.storage.from(BUCKET).upload(file, buffer, {
      contentType: mimeTypes[ext] || 'image/jpeg',
      upsert: true,
    });

    if (upError) {
      console.warn(`✗ (Upload failed)`);
      failed++;
    } else {
      console.log('✓');
      success++;
    }
  }

  console.log(`\n✅ Image copy done! ${success} copied, ${failed} failed.`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Sandhya Papad - Absolute Migration Runner');
  console.log(`   Target Project: ${projectRef}\n`);

  // const password = await askPassword(`Please enter the database password for project '${projectRef}': `);
  // if (!password.trim()) {
  //   console.error('❌ Password cannot be empty.');
  //   process.exit(1);
  // }

  // console.log('\n🔗 Linking Supabase Project...');
  // try {
  //   execSync(`cmd /c npx supabase link --project-ref ${projectRef} -p "${password}"`, { cwd: ROOT, stdio: 'inherit' });
  //   console.log('✅ Project linked successfully!');
  // } catch (e) {
  //   console.error('\n❌ Failed to link project. Check your password and try again.');
  //   process.exit(1);
  // }

  // runSqlFile('01_schema.sql');
  // runSqlFile('02_storage_bucket.sql');
  // runSqlFile('03_seed_data.sql');

  await copyImages();

  console.log('\n\n🎉 Absolute Migration completed successfully!');
}

main().catch((e) => {
  console.error('\n💥 Migration failed:', e.message);
  process.exit(1);
});
