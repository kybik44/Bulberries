"use client";
import Image from "next/image";
import { FC, HTMLProps } from "react";
import Text from "./Text";
import { StarIcon } from "./Icon";

interface CardProps extends HTMLProps<HTMLImageElement> {
  rating?: number;
  reviewCount?: number;
  price?: number;
  subTitle?: string;
  tag?: boolean;
  type?: string;
}

const Card: FC<CardProps> = ({
  className,
  src,
  title,
  subTitle,
  rating,
  reviewCount,
  price,
  tag,
  type,
}) => {
  return (
    <div
      className={`flex flex-col gap-4 flex-1 pt-10 p-7 bg-cardPrimary relative`}
    >
      {src && title && (
        <div
          className={`relative ${
            type == "category" ? "h-80" : "h-40"
          } ${className}`}
        >
          <Image src={src} alt={title} fill className="object-contain" />
        </div>
      )}
      <Text variant="infoXs" className="mt-4">
        {subTitle}
      </Text>
      <Text variant="productTitle">{title}</Text>
      {rating && reviewCount && price && (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <StarIcon rating={rating} />
            </div>
            <Text variant="infoXs">{reviewCount} отзывы</Text>
          </div>
          <Text variant="price">${price.toLocaleString()}</Text>
        </>
      )}
    </div>
  );
};

export default Card;
