import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95",
        secondary:
          "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md hover:from-emerald-600 hover:to-green-600 hover:shadow-lg hover:scale-105 active:scale-95",
        accent:
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:scale-105 active:scale-95",
        outline:
          "border-2 border-green-600 text-green-600 bg-white hover:bg-green-50 hover:scale-105 active:scale-95",
        ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        link: "text-green-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props,
      });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
