import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION COMPONENT
// Wrapper untuk semua section homepage dengan consistent spacing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Padding variant
   * - sm: py-12 md:py-16
   * - md: py-16 md:py-20
   * - lg: py-20 md:py-28
   */
  spacing?: "sm" | "md" | "lg";
  /**
   * Container size (passed to Container component)
   */
  containerSize?: "sm" | "md" | "lg" | "full";
  /**
   * Background variant
   */
  background?: "white" | "gray" | "gradient" | "green" | "transparent";
  /**
   * If true, no Container wrapper (full width content)
   */
  noContainer?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing = "md",
      containerSize = "lg",
      background = "transparent",
      noContainer = false,
      children,
      ...props
    },
    ref
  ) => {
    const content = noContainer ? (
      children
    ) : (
      <Container size={containerSize}>{children}</Container>
    );

    return (
      <section
        ref={ref}
        className={cn(
          // Spacing
          {
            "py-12 md:py-16": spacing === "sm",
            "py-16 md:py-20": spacing === "md",
            "py-20 md:py-28": spacing === "lg",
          },
          // Background
          {
            "bg-white": background === "white",
            "bg-surface-50": background === "gray",
            "bg-gradient-islamic": background === "gradient",
            "bg-green-50": background === "green",
            "bg-transparent": background === "transparent",
          },
          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
