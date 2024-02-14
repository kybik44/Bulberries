import { FC } from "react";
import Text from "../ui/Text";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="flex justify-between px-20 py-5 bg-cardPrimary">
      <div className="flex gap-5">
        <Text variant="description">Условия использования</Text>
        <Text variant="description">Политика конфиденциальности</Text>
      </div>
      <div>
        <Text variant="description">&copy; 2023-2024. Bulberries.com</Text>
      </div>
    </div>
  );
};

export default Footer;
