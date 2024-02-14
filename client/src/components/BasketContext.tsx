"use client";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const BasketContext = createContext({
  itemCount: 0,
  updateBasketCount: () => {},
});

interface BasketProviderProps {
  children: ReactNode;
}

export const BasketProvider: FC<BasketProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [itemCount, setItemCount] = useState<number>(0);

  const getBasketCount = async () => {
    const response = await fetch(apiRoute.basketCount, {
      headers: {
        "Content-type": "application/json",
        Authorization: session?.user.token,
      },
    });
    const parsedResponse = await response.json();
    setItemCount(parsedResponse);
  };
  useEffect(() => {
    if (status == "authenticated") {
      getBasketCount();
    }
  }, [status]);

  const updateBasketCount = () => {
    getBasketCount();
  };
  return (
    <BasketContext.Provider value={{ itemCount, updateBasketCount }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => useContext(BasketContext);
