/**
 * WhatsApp Cloud API Integration
 * Requires:
 *   WHATSAPP_API_TOKEN          — Permanent token from Meta Business Manager
 *   WHATSAPP_PHONE_NUMBER_ID    — Phone Number ID from WhatsApp > API Setup
 *   WHATSAPP_ADMIN_PHONE        — Admin's number to receive order alerts (e.g. 919876543210)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface TextParam {
  type: "text";
  text: string;
}

/** Used for dynamic URL buttons: the value replaces {{1}} in the template URL */
interface ButtonParam {
  type: "text";
  text: string; // the dynamic URL suffix
}

interface TemplateComponent {
  type: "body" | "header" | "button";
  /** Required for button components */
  sub_type?: "url";
  /** Required for button components — index of the button (0-based) */
  index?: number;
  parameters: TextParam[] | ButtonParam[];
}

interface WhatsAppMessagePayload {
  messaging_product: "whatsapp";
  to: string;
  type: "template";
  template: {
    name: string;
    language: { code: string };
    components: TemplateComponent[];
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Normalise a phone number to E.164 for India.
 * Accepts 10-digit local numbers or numbers already prefixed with 91/+91.
 */
function normaliseIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits; // already has country code
}

// ─── Core send function ───────────────────────────────────────────────────────

async function sendMessage(payload: WhatsAppMessagePayload): Promise<boolean> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.warn("[WhatsApp] Credentials missing — skipping send.");
    return false;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("[WhatsApp] API error:", JSON.stringify(data));
      return false;
    }

    return true;
  } catch (err) {
    console.error("[WhatsApp] Fetch failed:", err);
    return false;
  }
}

// ─── Public helpers ───────────────────────────────────────────────────────────

/**
 * Send the `order_confirmation` template to a customer.
 *
 * Template body variables:
 *   {{1}} Customer name
 *   {{2}} Order ID
 *   {{3}} Items summary  (e.g. "2x Masala Papad, 1x Pickle 500g")
 *   {{4}} Delivery address
 *
 * Template button is static (no dynamic params needed).
 */
export async function sendOrderConfirmationToCustomer(opts: {
  phone: string;
  customerName: string;
  orderId: string;
  itemsSummary: string;
  deliveryAddress: string;
}): Promise<boolean> {
  const payload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    to: normaliseIndianPhone(opts.phone),
    type: "template",
    template: {
      name: "order_confirmation",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: opts.customerName },
            { type: "text", text: opts.orderId },
            { type: "text", text: opts.itemsSummary },
            { type: "text", text: opts.deliveryAddress },
          ],
        }
      ],
    },
  };

  return sendMessage(payload);
}

/**
 * Send the `admin_new_order` template to the site owner.
 *
 * Template body variables:
 *   {{1}} Order ID
 *   {{2}} Total value (₹)
 *   {{3}} Items summary
 *   {{4}} Customer name + phone
 *   {{5}} Delivery address
 *   {{6}} Date & time placed
 *
 * Template button is static (no dynamic params needed).
 */
export async function sendNewOrderAlertToAdmin(opts: {
  orderId: string;
  total: number;
  itemsSummary: string;
  customerLabel: string; // e.g. "Rahul — 9876543210"
  deliveryAddress: string;
  placedAt: string; // e.g. "28 Apr 2026, 3:15 PM IST"
}): Promise<boolean> {
  const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;
  if (!adminPhone) {
    console.warn("[WhatsApp] WHATSAPP_ADMIN_PHONE not set — skipping admin alert.");
    return false;
  }

  const payload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    to: normaliseIndianPhone(adminPhone),
    type: "template",
    template: {
      name: "admin_new_order",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: opts.orderId },
            { type: "text", text: String(opts.total) },
            { type: "text", text: opts.itemsSummary },
            { type: "text", text: opts.customerLabel },
            { type: "text", text: opts.deliveryAddress },
            { type: "text", text: opts.placedAt },
          ],
        },
      ],
    },
  };

  return sendMessage(payload);
}
