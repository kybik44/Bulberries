"use client";
import { FC, useEffect, useState } from "react";
import Text from "./ui/Text";
import Card from "./ui/Card";
import { lastViewed } from "@/utils/data";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import { IProduct } from "@/app/(sellerLayout)/dashboard/page";

interface BestSellerProps {}

const BestSeller: FC<BestSellerProps> = ({}) => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<IProduct[]>();
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(apiRoute.getProductList, {
        headers: {
          "Content-type": "application/json",
          Authorization: session?.user.token,
        },
      });
      const parsedResponse = await response.json();
      setProducts(parsedResponse);
    };
    if (status == "authenticated") getProducts();
  }, [status]);

  return (
    <section>
      <Text variant="productTitle" className="mb-6">
        Лучшие продавцы Bulberries
      </Text>
      <div className="flex gap-4">
        {products &&
          products.map((data) => (
            <Card
              key={data._id}
              src={data.imageUrl}
              title={data.name}
              subTitle={data.description}
              rating={5}
              reviewCount={342}
              price={data.price}
            />
          ))}
      </div>
    </section>
  );
};

export default BestSeller;
