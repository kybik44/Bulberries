import { ButtonHTMLAttributes } from "react";
import { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

const buttonVariants = cva(["border", "max-w-max", "rounded-md"], {
  variants: {
    variant: {
      primary: [
        "text-primary",
        "bg-buttonSecondary",
        "border-transparent",
        "duration-300",
        "hover:-translate-y-1",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
      ],
      outline: ["bg-transparent", "border-primary", "text-primary"],
    },
    size: {
      small: ["text-sm", "px-2", "py-1"],
      medium: ["text-sm", "px-4", "py-2"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
const Button: FC<ButtonProps> = ({
  title,
  className,
  size,
  variant,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {title}
    </button>
  );
};

export default Button;
