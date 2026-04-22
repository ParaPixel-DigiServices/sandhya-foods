/**
 * WhatsApp Cloud API Integration
 * Requires:
 * WHATSAPP_API_TOKEN
 * WHATSAPP_PHONE_NUMBER_ID
 * WHATSAPP_ADMIN_PHONE (optional, for admin notifications)
 */

interface WhatsAppTemplateParam {
  type: "text" | "currency" | "date_time" | "document" | "image" | "video";
  text?: string;
  currency?: {
    fallback_value: string;
    code: string;
    amount_1000: number;
  };
  // Add other types as needed
}

interface WhatsAppMessagePayload {
  messaging_product: "whatsapp";
  to: string;
  type: "template";
  template: {
    name: string;
    language: {
      code: string;
    };
    components?: {
      type: "body" | "header" | "button";
      parameters: WhatsAppTemplateParam[];
    }[];
  };
}

export async function sendWhatsAppTemplateMessage(
  toPhone: string,
  templateName: string,
  bodyParams: WhatsAppTemplateParam[] = [],
  languageCode: string = "en"
) {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.warn("WhatsApp API credentials missing. Skipping message send.");
    return false;
  }

  // Format phone number: remove any non-digit characters.
  // If it's a 10-digit Indian number, prepend 91.
  let formattedPhone = toPhone.replace(/\D/g, "");
  if (formattedPhone.length === 10) {
    formattedPhone = `91${formattedPhone}`;
  }

  const payload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    to: formattedPhone,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode,
      },
      ...(bodyParams.length > 0 && {
        components: [
          {
            type: "body",
            parameters: bodyParams,
          },
        ],
      }),
    },
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", data);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    return false;
  }
}
