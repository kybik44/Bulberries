import { VariantProps, cva } from "class-variance-authority";
import { HTMLProps } from "react";
import { FC } from "react";
import { cn } from "@/utils/utils";

const titleVariant = cva("", {
  variants: {
    variant: {
      title1: ["text-4xl", "font-extrabold", "tracking-[0.2rem]"],
      title2: [],
      title3: [],
    },
  },
});
interface TitleProps
  extends VariantProps<typeof titleVariant>,
    HTMLProps<HTMLDivElement> {}

const Title: FC<TitleProps> = ({ title, variant, className }) => {
  return (
    <div className={cn(titleVariant({ variant, className }))}>{title}</div>
  );
};

export default Title;
