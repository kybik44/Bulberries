"use client";
import Image from "next/image";
import { FC } from "react";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { RightArrow, StarIcon } from "./ui/Icon";
import Text from "./ui/Text";
import Title from "./ui/Title";

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = ({}) => {
  return (
    <div className="flex p-20 gap-10 bg-cardPrimary">
      <div className="flex flex-col gap-4 flex-1 justify-center">
        <Title
          variant="title1"
          title="Магазин компьютеров и компьютерной гарнитуры"
        />
        <Text variant={"description"} className="w-2/4">
          Покупайте ноутбуки, ноутбуки, мониторы, планшеты, компьютерные игры,
          жесткие диски и накопители, аксессуары и многое другое.
        </Text>
        <Button variant="outline" size="medium" title="View more" />
      </div>
      <div className="relative flex flex-1 items-end h-72">
        <Badge
          variant="round"
          className="absolute flex right-14 -top-5 z-10"
          title="30%"
        />
        <Image
          src="/assets/images/real-headphones.png"
          alt=""
          className="absolute w-[35rem] -top-16 -right-20 "
          height={300}
          width={300}
        />
        <div className="flex bg-cardMain rounded-lg p-6 w-3/4">
          <div className="flex flex-col gap-2 flex-1">
            <Text variant="infoXs">Компьютеры и компьютерная гарнитура</Text>
            <Text variant="productTitle">Sony HR203 Headphones</Text>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <StarIcon rating={5} />
              </div>
              <Text variant="infoXs">347 отзывов</Text>
            </div>
            <div className="flex items-center gap-2">
              <Text variant="price">442 руб</Text>
              <Text variant="infoSm" className="line-through">
                820 руб
              </Text>
            </div>
            <div>
              <Text variant="infoXs">
                Узнать подробнее <RightArrow />
              </Text>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
