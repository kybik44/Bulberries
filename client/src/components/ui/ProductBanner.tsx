import Image from "next/image";
import { FC } from "react";
import { CircleRightArrow, RightArrow } from "./Icon";
import Text from "./Text";

interface ProductBannerProps {}

const ProductBanner: FC<ProductBannerProps> = ({}) => {
  return (
    <div className="flex flex-1 bg-cardSecondary">
      <div className="flex flex-col p-10 gap-4">
        <Text variant="titleXl">Образы для нее</Text>
        <Text variant="description">
          Магазин Bulberries Fashion содержит одежду, обувь, ювелирные изделия,
          часы, сумки и многое другое
        </Text>
        <Text variant="infoXs">
          Посмотреть еще <RightArrow />
        </Text>
        <div className="flex items-center  gap-3">
          <div>
            <Image
              src="/assets/images/bag.png"
              alt="Bag"
              height={0}
              width={100}
            />
          </div>
          <div>
            <Text variant="titleSm">Лучшие сумки</Text>
            <Text variant="infoXs">Скидка 30%</Text>
          </div>
          <div className="text-secondary">
            <CircleRightArrow />
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <Image
          src="/assets/images/clothes1.png"
          alt=""
          height={0}
          width={250}
        />
      </div>
    </div>
  );
};

export default ProductBanner;
