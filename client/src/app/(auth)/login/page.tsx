"use client";
import { FC } from "react";
import { Button, Input, Text } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z.string().email({ message: "Введите корректный e-mail" }),
  password: z.string().min(6),
});

export type IForm = z.infer<typeof schema>;

interface ILoginForm {}

const LoginForm: FC<ILoginForm> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ resolver: zodResolver(schema) });

  const onSubmitReady = async (data: IForm) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/home",
    });
  };
  return (
    <div className="flex flex-col gap-4 items-center rounded-md bg-cardSecondary shadow-lg w-96 p-10">
      <Text variant="price" className="inline-block max-w-max">
        Вход
      </Text>
      <form
        onSubmit={handleSubmit(onSubmitReady)}
        className="flex flex-col w-full gap-5"
      >
        <div>
          <Input
            variant="underline"
            placeholder="Email"
            register={register("email")}
          />
          {errors.email?.message && (
            <Text variant="error" className="mt-2 ml-2">
              {errors.email?.message}
            </Text>
          )}
        </div>
        <div>
          <Input
            variant="underline"
            placeholder="Пароль"
            type="password"
            register={register("password")}
          />
          {errors.password?.message && (
            <Text variant="error" className="mt-2 ml-2">
              {errors.password?.message}
            </Text>
          )}
        </div>
        <div className="flex justify-between">
          <Text
            variant="description"
            className="flex gap-2 cursor-default items-center"
          >
            <input id="remember" type="checkbox"></input>
            <label htmlFor="remember">Запомнить меня?</label>
          </Text>
          <Button type="submit" variant="primary" title="Вход" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
