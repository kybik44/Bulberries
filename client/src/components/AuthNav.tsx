"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Button, Text } from "./ui";
import { LeftArrow } from "./ui/Icon";

interface AuthNavProps {}

const AuthNav: FC<AuthNavProps> = ({}) => {
  const pathname = usePathname();

  return (
    <>
      <Text variant="titleSm" className="flex flex-1 items-center">
        <Link href="/home">
          <LeftArrow />
          Вернуться в магазин
        </Link>
      </Text>
      <div>Logo</div>
      <div className="flex flex-1 items-center justify-end">
        <Link
          className="flex gap-5 items-center "
          href={pathname == "/signin" ? "/signup" : "/signin"}
        >
          <Text variant="titleSm">
            {pathname == "/signin" ? "Войти?" : "Выйти?"}
          </Text>
          <Button
            variant="outline"
            title={pathname == "/signin" ? "Регистрация" : "Вход"}
          />
        </Link>
      </div>
    </>
  );
};

export default AuthNav;
