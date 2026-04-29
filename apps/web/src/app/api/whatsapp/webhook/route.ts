import { NextRequest, NextResponse } from "next/server"

/**
 * WhatsApp Cloud API Webhook
 *
 * Meta sends two types of requests to this endpoint:
 *  1. GET  — Verification challenge when you register the webhook in Meta dashboard.
 *  2. POST — Event notifications (message status updates: sent, delivered, read, failed).
 *
 * We don't receive customer replies here because we haven't subscribed to
 * inbound message events. This handler only processes delivery status updates.
 */

export const dynamic = "force-dynamic"

// ─── GET: Webhook Verification ───────────────────────────────────────────────
// Meta calls this once when you save the webhook URL in the dashboard.
// It sends a "hub.challenge" that we must echo back to confirm ownership.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const mode      = searchParams.get("hub.mode")
  const token     = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN

  if (mode === "subscribe" && token === verifyToken) {
    console.log("[WhatsApp Webhook] Verified successfully.")
    // Echo back the challenge as plain text — Meta requires this exact format
    return new NextResponse(challenge, { status: 200 })
  }

  console.warn("[WhatsApp Webhook] Verification failed. Token mismatch.")
  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}

// ─── POST: Status Update Events ──────────────────────────────────────────────
// Meta notifies us whenever a message we sent changes status:
//   sent → delivered → read   (or failed)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Safely traverse the nested event structure
    const entry    = body?.entry?.[0]
    const changes  = entry?.changes?.[0]
    const value    = changes?.value
    const statuses = value?.statuses

    if (statuses && statuses.length > 0) {
      for (const status of statuses) {
        const { id, status: msgStatus, recipient_id, timestamp, errors } = status

        if (msgStatus === "failed") {
          console.error(
            `[WhatsApp] Message FAILED — id: ${id}, to: ${recipient_id}, errors:`,
            JSON.stringify(errors)
          )
          // TODO: optionally update a DB field or trigger a retry here
        } else {
          console.log(
            `[WhatsApp] Message ${msgStatus} — id: ${id}, to: ${recipient_id}, ts: ${timestamp}`
          )
        }
      }
    }

    // Always return 200 OK to Meta — otherwise it retries the event
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error("[WhatsApp Webhook] Failed to parse event:", err)
    // Still return 200 to prevent infinite Meta retries
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
