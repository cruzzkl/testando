import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes } from "react";

const cta = cva(
  "group inline-flex items-center gap-4 rounded-full font-display text-sm font-medium uppercase tracking-[0.14em] transition-[background,color,border-color,transform] duration-300 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground px-8 py-4 hover:bg-foreground",
        ghost: "border border-input text-foreground px-8 py-4 hover:border-primary hover:text-primary",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export function Cta({ className, variant, children, ...p }: AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof cta>) {
  return (
    <a data-cursor="button" className={cn(cta({ variant }), className)} {...p}>
      {children}
      <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45">→</span>
    </a>
  );
}
