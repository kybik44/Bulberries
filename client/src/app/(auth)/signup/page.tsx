"use client";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import SignupForm, { IForm } from "@/components/signupForm/page";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface pageProps {}

const Signup: FC<pageProps> = ({}) => {
  const router = useRouter();
  const onSubmitRead: SubmitHandler<IForm> = async (data) => {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_API_AUTH!,
      },
      body: JSON.stringify(data),
    });
    const parsedResponse = await response.json();
    if (parsedResponse?.status == "failed") {
      return toast.error("Failed");
    }

    toast.success("Success");

    router.push("/signin");
  };

  return (
    <>
      <SignupForm onSubmitReady={onSubmitRead} />
    </>
  );
};

export default Signup;
