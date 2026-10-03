import { Resend } from "resend";

import { getFromEmail, getReceiverEmails } from "@/lib/config";

export type MailResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "send-failed" };

/**
 * Sends an internal notification to the team inbox via Resend.
 *
 * The sender address, recipients and API key all come from the environment;
 * nothing is hardcoded. The client is created inside the call, never at module
 * scope. Swapping providers (e.g. to AWS SES) only means changing this file.
 */
export async function sendTeamEmail(message: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = getReceiverEmails();
  const from = getFromEmail();

  if (!apiKey || !from || to.length === 0) {
    console.warn(
      "[mail] Email delivery is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_RECEIVER_EMAILS). Message was not sent.",
    );
    return { ok: false, reason: "not-configured" };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      subject: message.subject,
      text: message.text,
      html: message.html,
      replyTo: message.replyTo,
    });
    if (error) {
      console.error("[mail] Resend rejected the message:", error);
      return { ok: false, reason: "send-failed" };
    }
    return { ok: true };
  } catch (cause) {
    console.error("[mail] Unexpected failure sending message:", cause);
    return { ok: false, reason: "send-failed" };
  }
}
