/**
 * Test script — sends both WhatsApp template messages to a given number.
 * Run from the `apps/web` directory:
 *   node --env-file=.env.local test-whatsapp.mjs
 */

const API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TEST_PHONE = "919162392229"; // +91 91623 92229

// ─── Core send ───────────────────────────────────────────────────────────────

async function send(payload) {
  const res = await fetch(
    `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    console.error("❌ API error:", JSON.stringify(data, null, 2));
  } else {
    console.log("✅ Sent! Response:", JSON.stringify(data, null, 2));
  }
  return res.ok;
}

// ─── Template 1: order_confirmation (Customer) ───────────────────────────────

async function testCustomerMessage() {
  console.log("\n📤 Sending order_confirmation to customer...");
  return send({
    messaging_product: "whatsapp",
    to: TEST_PHONE,
    type: "template",
    template: {
      name: "order_confirmation",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "Rahul" },                          // {{1}} Customer name
            { type: "text", text: "SF-1024" },                        // {{2}} Order ID
            { type: "text", text: "2x Masala Papad, 1x Mango Pickle (500g)" }, // {{3}} Items
            { type: "text", text: "Flat 302, Green Heights, Andheri West, Mumbai 400053" }, // {{4}} Address
          ],
        },
        {
          // Dynamic URL button — fills the {{1}} in the template URL
          type: "button",
          sub_type: "url",
          index: 0,
          parameters: [
            { type: "text", text: "12376543" }, // sample order ID suffix in URL
          ],
        },
      ],
    },
  });
}

// ─── Template 2: admin_new_order (Owner) ─────────────────────────────────────

async function testAdminMessage() {
  console.log("\n📤 Sending admin_new_order to admin...");
  return send({
    messaging_product: "whatsapp",
    to: TEST_PHONE,
    type: "template",
    template: {
      name: "admin_new_order",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "SF-1024" },                         // {{1}} Order ID
            { type: "text", text: "649" },                             // {{2}} Total (₹)
            { type: "text", text: "2x Masala Papad, 1x Mango Pickle (500g)" }, // {{3}} Items
            { type: "text", text: "Rahul — 9162392229" },              // {{4}} Customer + phone
            { type: "text", text: "Flat 302, Green Heights, Andheri West, Mumbai 400053" }, // {{5}} Address
            { type: "text", text: "28 Apr 2026, 3:15 PM IST" },        // {{6}} Date & time
          ],
        },
      ],
    },
  });
}

// ─── Run ──────────────────────────────────────────────────────────────────────

(async () => {
  if (!API_TOKEN || !PHONE_NUMBER_ID) {
    console.error("❌ Missing WHATSAPP_API_TOKEN or WHATSAPP_PHONE_NUMBER_ID in environment.");
    process.exit(1);
  }

  console.log(`🔑 Using Phone Number ID: ${PHONE_NUMBER_ID}`);
  console.log(`📱 Sending to: +${TEST_PHONE}`);

  await testCustomerMessage();
  await testAdminMessage();

  console.log("\nDone.");
})();
