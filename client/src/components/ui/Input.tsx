import { VariantProps, cva } from "class-variance-authority";
import { FC, InputHTMLAttributes } from "react";
import { cn } from "../../utils/utils";

const inputVariants = cva(["w-full", "outline-0"], {
  variants: {
    variant: {
      image: [
        "text-sm",
        "file:px-4",
        "file:py-2",
        "file:mr-4",
        "file:text-sm",
        "file:border-0",
        "text-slate-500",
        "file:rounded-full",
        "file:font-semibold",
        "file:text-dark",
        "file:bg-hoverPrimary",
        "cursor-pointer",
        "hover:file:bg-hoverPrimary",
      ],
      underline: [
        "border-secondary",
        "bg-transparent",
        "focus:border-primary",
        "border-b",
      ],
      noBorder: ["bg-transparent", "focus:border-b", "border-secondary"],
    },
    sizes: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-sm", "py-2", "px-4"],
    },
  },
  defaultVariants: {
    variant: "underline",
    sizes: "medium",
  },
});

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  register?: unknown;
}
const Input: FC<InputProps> = ({
  title,
  className,
  type,
  sizes,
  variant,
  register,
  ...props
}) => {
  return (
    <>
      <input
        {...(register ?? {})}
        type={type ?? "text"}
        {...props}
        className={cn(inputVariants({ variant, sizes, className }))}
      >
        {title}
      </input>
    </>
  );
};

export default Input;
