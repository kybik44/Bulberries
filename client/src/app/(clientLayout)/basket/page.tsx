"use client";
import { Text } from "@/components";
import BasketCard from "@/components/BasketCard";
import { useBasketContext } from "@/components/BasketContext";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

interface pageProps {}

interface IBasket {
  _id: string;
  userId: string;
  quantity: number;
  productId: string;
  productData: [
    {
      _id: string;
      name: string;
      category: string;
      description: string;
      imageUrl: string;
      price: number;
      userId: string;
      created: string;
      updated: string;
    }
  ];
}
const Basket: FC<pageProps> = ({}) => {
  const { data: session, status } = useSession();
  const [basket, setBasket] = useState<IBasket[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const getBasketProducts = async () => {
      const response = await fetch(apiRoute.viewBasket, {
        headers: {
          "Content-type": "application/json",
          Authorization: session?.user.token,
        },
      });
      const parsedResponse: IBasket[] = await response.json();
      const total = parsedResponse.reduce((sum, productItem) => {
        return sum + productItem.productData[0].price * productItem.quantity;
      }, 0);
      setTotalPrice(total);
      setBasket(parsedResponse);
    };
    if (status == "authenticated") {
      getBasketProducts();
    }
  }, [status]);

  const { itemCount } = useBasketContext();
  return (
    <div className="flex">
      <div className="bg-cardMain p-10 flex-1">
        <div className="flex justify-between border-b p-5 border-primary">
          <Text variant="titleXl">Корзина</Text>
          <Text variant="titleXl">{itemCount} Продукты</Text>
        </div>
        <div className="flex">
          <Text variant="price" className="flex-1">
            Название
          </Text>
          <Text variant="price" className="flex-1">
            Количество
          </Text>
          <Text variant="price" className="flex-1">
            Цена
          </Text>
        </div>

        {basket &&
          basket.map((basket) => (
            <BasketCard
              imageUrl={basket.productData[0].imageUrl}
              price={basket.productData[0].price}
              quantity={basket.quantity}
              productTitle={basket.productData[0].name}
            />
          ))}
      </div>
      <div className="flex flex-col gap-5 w-96 p-10 bg-cardPrimary">
        <div className="p-5 border-primary border-b">
          <Text variant="titleXl">Сумма заказа</Text>
        </div>
        <div className="flex justify-between">
          <Text variant="price">Конечная сумма заказа</Text>
          <Text variant="price">${totalPrice.toLocaleString()}</Text>
        </div>
      </div>
    </div>
  );
};

export default Basket;
