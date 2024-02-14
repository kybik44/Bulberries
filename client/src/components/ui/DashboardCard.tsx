import Image from "next/image";
import { FC, ImgHTMLAttributes } from "react";
import { DotMenu } from "./Icon";
import { Text, Button } from "./";

interface DashboardCardProps extends ImgHTMLAttributes<HTMLImageElement> {
  title: string;
  src: string;
  productId: string;
  date: string;
  removeProducts: (id: string) => void;
}

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  productId,
  src,
  date,
  removeProducts,
}) => {
  return (
    <div className="flex flex-col rounded-md p-5 gap-5 bg-cardMain shadow-md ">
      <div className="flex relative justify-end">
        <div className="group">
          <DotMenu className="text-secondary cursor-pointer" />
          <ul className="hidden hoverNavLink group-hover:flex flex-col absolute right-0 z-10 rounded-md shadow bg-cardMain">
            <li>Редактировать</li>
            <li>Добавить в список желаемого</li>
            <li onClick={() => removeProducts(productId)}>Remove</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex relative items-center justify-center rounded-full w-28 h-28">
          <Image
            src={src}
            alt={title}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <Text variant="price" className="mt-5">
          {title}
        </Text>
        <Text variant="infoXs">{date}</Text>
      </div>
      <div className="flex items-center justify-between">
        <Text variant="infoXs">100</Text>
        <Button variant="outline" title="View" />
      </div>
    </div>
  );
};

export default DashboardCard;
