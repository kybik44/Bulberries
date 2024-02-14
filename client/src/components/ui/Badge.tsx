import { HTMLProps } from "react";
import { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

const badgeVariant = cva(
  [
    "bg-orange-400",
    "rounded-md",
    "text-white",
    "items-center",
    "justify-center",
  ],
  {
    variants: {
      variant: {
        round: ["rounded-full", "h-16 w-16"],
        button: ["rounded-md"],
      },
      badgeSize: {
        small: ["text-sm", "px-2", "py-1"],
        medium: ["text-base", "px-4", "py-2"],
      },
    },
    defaultVariants: {
      variant: "button",
      badgeSize: "small",
    },
  }
);

interface BadgeProps
  extends HTMLProps<HTMLDivElement>,
    VariantProps<typeof badgeVariant> {}

const Badge: FC<BadgeProps> = ({
  title,
  className,
  badgeSize,
  variant,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(badgeVariant({ variant, badgeSize, className }))}
    >
      {title}
    </div>
  );
};

export default Badge;
