import { handleFormPost } from "@/lib/form-handler";
import { validateCommercialInquiry } from "@/lib/forms";
import { renderEmail, rowsToText, type EmailRow } from "@/lib/html";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleFormPost(request, {
    turnstileAction: "commercial_inquiry",
    validate: validateCommercialInquiry,
    compose: (data) => {
      const rows: EmailRow[] = [
        ["Business", data.business],
        ["Contact", data.name],
        ["Email", data.email],
        ["Phone", data.phone || "—"],
        ["Industry", data.industry],
        ["Monthly volume", data.monthlyVolume],
        ["Desired size", data.desiredSize],
      ];
      return {
        subject: `Commercial inquiry — ${data.business} — ${data.industry}`,
        text: [rowsToText(rows), "", "Message:", data.message || "—"].join("\n"),
        html: renderEmail({
          heading: "New commercial / wholesale inquiry",
          rows,
          message: data.message,
        }),
        replyTo: data.email,
      };
    },
  });
}
