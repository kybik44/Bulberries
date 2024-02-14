"use client";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import ProductCard from "@/components/ProductCard";
import { toast } from "react-hot-toast";
import { useBasketContext } from "@/components/BasketContext";

interface pageProps {}
export interface IProduct {
  _id: string;
  name: string;
  category: string;
  description: string;
  created: string;
  updated: string;
  imageUrl: string;
  price: number;
  userId: string;
}

const ProductsList: FC<pageProps> = ({}) => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<IProduct[]>();
  const { updateBasketCount } = useBasketContext();

  const addToBasket = async (productId: string) => {
    await fetch(apiRoute.addToBasket, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: session?.user.token,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    updateBasketCount();
    toast.success("Товар добавлен в корзину");
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(apiRoute.getProducts, {
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
    <div className="grid grid-cols-4 flex-1 gap-4">
      {products &&
        products.map((product) => (
          <ProductCard
            key={product._id}
            productId={product._id}
            src={product.imageUrl}
            title={product.name}
            addToBasket={addToBasket}
            date={formatDate(product.created)}
            price={product.price}
          />
        ))}
    </div>
  );
};

export default ProductsList;
