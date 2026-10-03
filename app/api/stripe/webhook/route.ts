import type Stripe from "stripe";

import { sendTeamEmail } from "@/lib/mail";
import { buildOrderEmail } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function notifyOrder(stripe: Stripe, session: Stripe.Checkout.Session) {
  const items = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });
  const email = buildOrderEmail(session, items.data);
  return sendTeamEmail({
    ...email,
    replyTo: session.customer_details?.email ?? undefined,
  });
}

/**
 * Receives Stripe events and emails the team when an order is paid.
 *
 * Returns a non-2xx status when the team notification could not be sent, so
 * Stripe retries the delivery instead of the order silently going unnoticed.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !secret) {
    console.warn("[webhook] STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET is not set.");
    return Response.json({ received: false }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  // The signature covers the exact bytes Stripe sent, so read the raw body.
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;
      if (session.payment_status !== "paid") break;

      const result = await notifyOrder(stripe, session);
      if (!result.ok) {
        return Response.json({ received: false }, { status: 500 });
      }
      break;
    }
    case "checkout.session.async_payment_failed":
      console.warn("[webhook] Async payment failed for", event.data.object.id);
      break;
    default:
      break;
  }

  return Response.json({ received: true });
}
