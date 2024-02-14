import { FC } from "react";
import Text from "../ui/Text";

interface FooterMenuProps {}

const FooterMenu: FC<FooterMenuProps> = ({}) => {
  return (
    <div className="flex justify-between py-10 px-25 bg-cardSecondary">
      <div className="flex flex-col gap-4">
        <Text variant="titleSm">О нас</Text>
        <div className="flex flex-col gap-2">
          <Text variant="description">Карьера</Text>
          <Text variant="description">Блог</Text>
          <Text variant="description">Про Bulberries</Text>
          <Text variant="description">Инвесторам</Text>
          <Text variant="description">Bulberries девайсы</Text>
          <Text variant="description">Bulberries туры</Text>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Text variant="titleSm">Зарабатывайте с нами</Text>
        <div className="flex flex-col gap-2">
          <Text variant="description">Продавайте товары на Bulberries</Text>
          <Text variant="description">Стать партнером</Text>
          <Text variant="description">Рекламируйте свои товары</Text>
          <Text variant="description">Публикуйтесь вместе с нами</Text>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Text variant="titleSm">Поможем вам</Text>
        <div className="flex flex-col gap-2">
          <Text variant="description">Ваш аккаунт</Text>
          <Text variant="description">Заказы</Text>
          <Text variant="description">Условия доставки</Text>
          <Text variant="description">Публикация контента</Text>
          <Text variant="description">Bulberries помощник</Text>
          <Text variant="description">Помощь</Text>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Text variant="titleSm">Типы оплаты Bulberries</Text>
        <div className="flex flex-col gap-2">
          <Text variant="description">Bulberries Business Card</Text>
          <Text variant="description">Бонусная система</Text>
          <Text variant="description">Пополните свой баланс</Text>
          <Text variant="description">Конвертер валют Bulberries</Text>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
