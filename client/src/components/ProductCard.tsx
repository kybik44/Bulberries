import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { FC, ImgHTMLAttributes, useState } from "react";
import { Button, Text } from "./ui";
import { DotMenu } from "./ui/Icon";

interface ProductCardProps extends ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  src: string;
  productId: string;
  date: string;
  price: number;
  addToBasket: (id: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  title,
  productId,
  src,
  date,
  price,
  addToBasket,
}) => {
  const [loader, setLoader] = useState<boolean>(false);

  const handleAddToBasket = async () => {
    setLoader(true);
    await addToBasket(productId);
    setLoader(false);
  };

  return (
    <div className="bg-cardMain flex flex-col gap-5 rounded-md shadow-md p-5">
      <div className="flex relative justify-end">
        <div className="group">
          <DotMenu className=" text-secondary cursor-pointer" />
          <ul className="bg-cardMain hidden hoverNavLink group-hover:flex flex-col absolute rounded-md shadow right-0 z-10">
            <li>Добавить в список желаемого</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex relative items-center justify-center rounded-full h-28 w-28">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <Text variant="price" className="mt-5">
          {title}
        </Text>
        <Text variant="infoXs">{date}</Text>
      </div>
      <div className="flex items-center justify-between">
        <Text variant="price">${price.toLocaleString()}</Text>
        {loader ? (
          <Loader />
        ) : (
          <Button
            variant="outline"
            onClick={handleAddToBasket}
            title="Добавить в корзину"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
