"use client";
import Image from "next/image";
import { FC, ImgHTMLAttributes } from "react";
import Button from "../ui/Button";
import { RightArrow } from "../ui/Icon";
import Text from "../ui/Text";

interface MiniBannerProps extends ImgHTMLAttributes<HTMLImageElement> {
  desc: string;
  actionButton?: boolean;
}

const MiniBanner: FC<MiniBannerProps> = ({
  title,
  desc,
  actionButton,
  src,
}) => {
  return (
    <div className="flex flex-1 bg-cardSecondary">
      <div className="flex flex-1 flex-col p-5 gap-3">
        <Text variant="productTitle">{title}</Text>
        <Text variant="description">{desc}</Text>
        <div>
          {actionButton ? (
            <Button variant="outline" />
          ) : (
            <Text variant="infoXs">
              Посмотреть подробнее <RightArrow />
            </Text>
          )}
        </div>
      </div>
      <div className="relative flex flex-1 justify-end">
        {src && title && (
          <Image src={src} className="object-cover" alt={title} fill />
        )}
      </div>
    </div>
  );
};

export default MiniBanner;
