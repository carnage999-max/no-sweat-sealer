import { handleFormPost } from "@/lib/form-handler";
import { validateContactMessage } from "@/lib/forms";
import { renderEmail, rowsToText, type EmailRow } from "@/lib/html";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleFormPost(request, {
    turnstileAction: "contact_form",
    validate: validateContactMessage,
    compose: (data) => {
      const rows: EmailRow[] = [
        ["Name", data.name],
        ["Email", data.email],
        ["Topic", data.topic],
      ];
      return {
        subject: `Website message — ${data.topic} — ${data.name}`,
        text: [rowsToText(rows), "", "Message:", data.message].join("\n"),
        html: renderEmail({
          heading: "New website message",
          rows,
          message: data.message,
        }),
        replyTo: data.email,
      };
    },
  });
}
