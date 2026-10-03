import { Reveal } from "@/components/ui/Reveal";
import { ApplyIcon, DropletIcon, PrepIcon, SnowflakeIcon } from "@/components/ui/icons";
import { CLAIMS } from "@/content/claims";

const ICONS = [DropletIcon, PrepIcon, ApplyIcon, SnowflakeIcon] as const;

export function Why() {
  return (
    <section className="band">
      <div className="wrap">
        <Reveal>
          <h2 className="display display-lg max-w-3xl">Why No Sweat®</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLAIMS.benefits.map((benefit, index) => {
            const Icon = ICONS[index];
            return (
              <Reveal key={benefit.title} delay={index * 100} className="glass p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1ac8f4,#2b7bff)] text-void">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="display display-sm mt-5">{benefit.title}</h3>
                <p className="mt-3 text-frost">{benefit.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
