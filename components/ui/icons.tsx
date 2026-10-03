import type { ReactNode, SVGProps } from "react";

/**
 * One icon family: 24px grid, 1.75px round strokes, no fills. Mixing packs is
 * what makes sites look assembled, so every glyph here is drawn to this spec.
 */
function Icon({
  children,
  strokeWidth = 1.75,
  ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

type P = SVGProps<SVGSVGElement>;

export const CartIcon = (p: P) => (
  <Icon {...p}>
    <path d="M3 4h2.2l2.1 10.4a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2" />
    <circle cx="9.5" cy="19.5" r="1.1" />
    <circle cx="16.5" cy="19.5" r="1.1" />
  </Icon>
);

export const MenuIcon = (p: P) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = (p: P) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const PlusIcon = (p: P) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const MinusIcon = (p: P) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);

export const ChevronDownIcon = (p: P) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const CheckIcon = (p: P) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

export const DownloadIcon = (p: P) => (
  <Icon {...p}>
    <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14" />
  </Icon>
);

export const DropletIcon = (p: P) => (
  <Icon {...p}>
    <path d="M12 3.2s6 6.1 6 10.3a6 6 0 0 1-12 0C6 9.3 12 3.2 12 3.2z" />
  </Icon>
);

/** PREP: a cloth wiping a surface. */
export const PrepIcon = (p: P) => (
  <Icon {...p}>
    <path d="M3.5 9.5c2.8-2 5.3 1.7 8.5 0s5.7-1.9 8.5 0v8.5c-2.8-1.9-5.3-.5-8.5 1s-5.7 0-8.5-1z" />
    <path d="M8 5.5l1.2 1.7M12 4l.4 2.1M16 5.5l-1.2 1.7" />
  </Icon>
);

/** APPLY: a spray bottle with mist. */
export const ApplyIcon = (p: P) => (
  <Icon {...p}>
    <path d="M7 21v-8.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V21z" />
    <path d="M9.5 10.5V7.5h3v3" />
    <path d="M8.5 7.5V4.5h5l3 1.5v1.5z" />
    <path d="M18.5 9.2h2M18.2 12h2.6M18.5 14.8h2" />
  </Icon>
);

/** CURE: a timer. */
export const CureIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 9.5v4.2l2.7 1.8M9.5 3h5" />
  </Icon>
);

/** 4 oz: a small pump spray bottle. */
export const SprayBottleIcon = (p: P) => (
  <Icon {...p}>
    <path d="M8 21v-9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v9z" />
    <path d="M10.5 10V7.2h3V10" />
    <path d="M9.5 7.2V4h4.5l2.5 1.4v1.8z" />
  </Icon>
);

/** 16 oz: a tall refill bottle with a screw cap. */
export const RefillBottleIcon = (p: P) => (
  <Icon {...p}>
    <path d="M9.5 2.8h5V6h-5z" />
    <path d="M9.5 6C8 7.6 7 8.6 7 11v8.6a1.6 1.6 0 0 0 1.6 1.6h6.8a1.6 1.6 0 0 0 1.6-1.6V11c0-2.4-1-3.4-2.5-5" />
    <path d="M7 13.5h10" />
  </Icon>
);

/** 1 gallon: a jug with a handle. */
export const JugIcon = (p: P) => (
  <Icon {...p}>
    <path d="M9 3h4v3.2H9z" />
    <path d="M7 8.2h8.4A2.6 2.6 0 0 1 18 10.8V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8.8a2 2 0 0 1 2-2z" />
    <path d="M18 11.5h1.2a1.3 1.3 0 0 1 1.3 1.3v2.4a1.3 1.3 0 0 1-1.3 1.3H18" />
    <path d="M5 14h13" />
  </Icon>
);
