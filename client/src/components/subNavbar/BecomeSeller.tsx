"use client";
import { apiRoute } from "@/utils/apiRoutes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useCallback } from "react";
import { toast } from "react-hot-toast";

interface BecomeSellerProps {}

const BecomeSeller: FC<BecomeSellerProps> = ({}) => {
  const { data: session, status, update } = useSession();

  const becomeSeller = useCallback(async () => {
    if (status === "authenticated") {
      console.log(session);
      const response = await fetch(`${apiRoute.becomeSeller}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${session.user.token}`,
        },
        body: JSON.stringify({
          licenseId: "test",
        }),
      });

      const parsedResponse = await response.json();
      if (parsedResponse.status == "success") {
        toast.success("Теперь вы продавец");

        if (parsedResponse.licenseId) {
          update({ licenseId: parsedResponse.licenseId });
        }
      } else {
        toast.error(parsedResponse.message || "Произошла неизвестная ошибка");
      }
    }
  }, [status]);

  return (
    <li className="subNavLink">
      {session?.user.licenseId ? (
        <Link href="/dashboard">
          <button className="flex items-center gap-2">Панель продавца</button>
        </Link>
      ) : (
        <button className="flex items-center gap-2" onClick={becomeSeller}>
          Стать продавцом
        </button>
      )}
    </li>
  );
};

export default BecomeSeller;
