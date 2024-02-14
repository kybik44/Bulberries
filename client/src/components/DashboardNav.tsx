import { FC } from "react";
import { Rocket } from "./ui/Icon";
import { Button, Text } from "./ui";
import Link from "next/link";

interface DashboardNavProps {}

const DashboardNav: FC<DashboardNavProps> = ({}) => {
  return (
    <div className="flex justify-between items-center mt-5">
      <div className="flex gap-5">
        <div className="p-5 rounded-md text-primary bg-buttonSecondary">
          <Rocket />
        </div>
        <div className="flex flex-col justify-center">
          <Text variant="titleXl">Игорь Мисюк</Text>
          <Text variant="infoSm">Продавец</Text>
        </div>
      </div>
      <div>
        <Link href="/addProduct">
          <Button variant="primary" title="Добавить товар" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardNav;
