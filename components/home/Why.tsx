import { CLAIMS } from "@/content/claims";

export function Why() {
  return (
    <section className="band border-t border-line bg-graphite">
      <div className="wrap">
        <h2 className="display display-lg max-w-3xl">Why No Sweat®</h2>
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {CLAIMS.benefits.map((benefit) => (
            <div key={benefit.title} className="border-t border-cyan pt-5">
              <h3 className="display display-sm">{benefit.title}</h3>
              <p className="mt-3 max-w-sm text-frost">{benefit.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
