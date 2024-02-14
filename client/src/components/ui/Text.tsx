import { cn } from "@/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, HTMLProps } from "react";

const descriptionVariant = cva("cursor-pointer", {
  variants: {
    variant: {
      productTitle: ["leading-5"],
      description: ["text-xs"],
      titleSm: ["text-sm", "tracking-wide"],
      titleXl: ["text-xl", "font-semibold", "tracking-wide"],
      infoSm: ["text-sm", "text-secondary"],
      infoXs: ["text-xs", "text-secondary"],
      price: ["text-xl", "font-medium"],
      error: ["text-xs", "text-red-500"],
    },
  },
  defaultVariants: {
    variant: "description",
  },
});
interface DescriptionProps
  extends VariantProps<typeof descriptionVariant>,
    HTMLProps<HTMLDivElement> {}

const Text: FC<DescriptionProps> = ({ children, variant, className }) => {
  return (
    <div className={cn(descriptionVariant({ variant, className }))}>
      {children}
    </div>
  );
};

export default Text;
