import Image from "next/image";
import { FC } from "react";
import Text from "./Text";

interface SliderItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

const SliderItem: FC<SliderItemProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="flex flex-1 gap-4">
      <div>
        <Image src={imageSrc} height={100} width={100} alt={title} />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <Text>{title}</Text>
        <Text variant="infoSm">{description}</Text>
      </div>
    </div>
  );
};

export default SliderItem;
