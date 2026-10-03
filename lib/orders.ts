import type Stripe from "stripe";

import { formatPrice } from "@/lib/catalog";
import { renderEmail, rowsToText, type EmailRow } from "@/lib/html";

function formatAddress(
  address: Stripe.Address | null | undefined,
): string {
  if (!address) return "—";
  return [
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(", "),
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Formats the internal "new order" notification from a paid Checkout Session.
 * Pure: takes already-fetched Stripe objects and returns the email content.
 */
export function buildOrderEmail(
  session: Stripe.Checkout.Session,
  lineItems: readonly Stripe.LineItem[],
): { subject: string; text: string; html: string } {
  const currency = session.currency ?? "usd";
  const shipping = session.collected_information?.shipping_details;
  const total = formatPrice(session.amount_total ?? 0, currency);

  const items = lineItems
    .map(
      (item) =>
        `${item.quantity ?? 1} × ${item.description ?? "Item"} — ${formatPrice(item.amount_total, currency)}`,
    )
    .join("\n");

  const rows: EmailRow[] = [
    ["Order", session.id],
    ["Total", total],
    ["Items", items || "—"],
    ["Customer", session.customer_details?.name ?? "—"],
    ["Email", session.customer_details?.email ?? "—"],
    ["Phone", session.customer_details?.phone ?? "—"],
    ["Ship to", shipping?.name ?? "—"],
    ["Address", formatAddress(shipping?.address)],
  ];

  return {
    subject: `New No Sweat order — ${total}`,
    text: rowsToText(rows),
    html: renderEmail({ heading: "New No Sweat order", rows }),
  };
}
