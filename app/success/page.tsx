import type { Metadata } from "next";
import Link from "next/link";

import { PurchaseEffect } from "@/components/cart/PurchaseEffect";
import { btn } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/catalog";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

type Order = {
  id: string;
  email: string | null;
  currency: string;
  total: number;
  items: { description: string; quantity: number; amount: number }[];
};

/**
 * Asks Stripe directly whether this session was paid, rather than trusting the
 * URL. Anyone can type /success, so the page only claims success when Stripe
 * says so.
 */
async function loadOrder(sessionId: unknown): Promise<Order | null> {
  if (typeof sessionId !== "string" || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
    if (session.payment_status !== "paid") return null;
    return {
      id: session.id,
      email: session.customer_details?.email ?? null,
      currency: session.currency ?? "usd",
      total: session.amount_total ?? 0,
      items: (session.line_items?.data ?? []).map((item) => ({
        description: item.description ?? "Item",
        quantity: item.quantity ?? 1,
        amount: item.amount_total,
      })),
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const { session_id } = await searchParams;
  const order = await loadOrder(session_id);

  if (!order) {
    return (
      <section className="band">
        <div className="wrap max-w-2xl">
          <h1 className="display display-lg">We couldn&rsquo;t confirm this order.</h1>
          <p className="lede mt-6 text-frost">
            If you just paid, your order may still be processing. Check your email, or contact us with the details and
            we&rsquo;ll look into it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className={btn("primary", "lg")}>
              Contact us
            </Link>
            <Link href="/" className={btn("ghost", "lg")}>
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="band">
      <div className="wrap max-w-2xl">
        <PurchaseEffect sessionId={order.id} value={order.total / 100} currency={order.currency} />
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-void">
          <CheckIcon className="h-7 w-7" strokeWidth={2.25} />
        </span>
        <h1 className="display display-lg mt-6">Order confirmed.</h1>
        {order.email ? (
          <p className="lede mt-5 text-frost">
            Thank you. We have your order for <strong className="text-ice">{order.email}</strong>.
          </p>
        ) : (
          <p className="lede mt-5 text-frost">Thank you. We have your order.</p>
        )}

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {order.items.map((item) => (
            <li key={item.description} className="flex justify-between gap-6 py-4">
              <span>
                {item.quantity} × {item.description}
              </span>
              <span className="tnum font-semibold">{formatPrice(item.amount, order.currency)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-6 py-4 text-lg font-bold">
            <span>Total</span>
            <span className="tnum">{formatPrice(order.total, order.currency)}</span>
          </li>
        </ul>

        <p className="mt-6 text-sm text-frost">Order reference: {order.id}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/safety" className={btn("primary", "lg")}>
            Read the directions
          </Link>
          <Link href="/" className={btn("ghost", "lg")}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
