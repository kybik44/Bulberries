import { signOut } from "next-auth/react";
import { FC } from "react";

interface UserProps {}

const User: FC<UserProps> = ({}) => {
  return (
    <ul className="w-max hidden hoverNavLink group-hover:flex absolute top-10 right-0 shadow-md flex-col text-sm font-medium z-20 rounded-md bg-cardMain">
      <li>Аккаунт</li>
      <li>Магазин</li>
      <li>Заказы</li>
      <li>Подписки</li>
      <li>Девайсы</li>
      <li>Музыка</li>
      <li onClick={() => signOut()}>Выйти</li>
    </ul>
  );
};

export default User;
