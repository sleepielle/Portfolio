export const GRADIENT_BUTTON_CLASSNAME =
  "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]";

export const POSTS_CARD_GRADIENTS: Record<
  string,
  { from: string; to: string; color: string }
> = {
  Now: { from: "#fff1d6", to: "#ffffff", color: "#ffb112" },
  Notes: { from: "#e8f9df", to: "#ffffff", color: "#71dd37" },
  Snippets: { from: "#d6f5fc", to: "#ffffff", color: "#1ecaee" },
  Research: { from: "#e7e7ff", to: "#ffffff", color: "#696cff" },
};

export const PROJECTS_CARD_GRADIENTS: Record<
  string,
  { from: string; to: string; color: string }
> = {
  Frontend: { from: "#fff1d6", to: "#ffffff", color: "#ffb112" },
  Fullstack: { from: "#e8f9df", to: "#ffffff", color: "#71dd37" },
};

export const POSTS_TAG_GRADIENTS: Record<
  string,
  { from: string; to: string; color: string }
> = {
  Now: { from: "#fff1d6", to: "#ffffff", color: "#ffb112" },
  Notes: { from: "#e8f9df", to: "#ffffff", color: "#71dd37" },
  Snippets: { from: "#d6f5fc", to: "#ffffff", color: "#1ecaee" },
  Research: { from: "#e7e7ff", to: "#ffffff", color: "#696cff" },
};
