import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";

const buttonVariants = cva(
  // Base styles

  "inline-flex justify-center px-4 py-2 ring-offset-background w-[60%]",
  {
    variants: {
      // Define variant styles
      variant: {
        default: "border-2 p-1 rounded-xl  hover:bg-gray-800/60",
        link: "underline-offset-4 hover:underline text-sm",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  route: string;
}

const RedirectButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ asChild = false, variant, route, ...props }, ref) => {
  return (
    <Link href={route} className="w-full flex justify-center">
      <button className={buttonVariants({ variant })} ref={ref} {...props} />
    </Link>
  );
});

RedirectButton.displayName = "RedirectButton";

export { RedirectButton, buttonVariants };
