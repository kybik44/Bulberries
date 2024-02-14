import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Text } from "../ui";

export type IForm = z.infer<typeof schema>;

interface ISignupForm {
  onSubmitReady: (data: IForm) => void;
}

const schema = z
  .object({
    name: z.string().min(2, { message: "Это поле обязательное" }),
    email: z.string().email({ message: "Пожалуйста введите корректную почту" }),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароль не совпадает",
    path: ["confirmPassword"],
  });

const SignupForm: FC<ISignupForm> = ({ onSubmitReady }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ resolver: zodResolver(schema) });

  return (
    <div className="flex flex-col gap-4 w-96 p-10 items-center bg-cardSecondary rounded-md shadow-lg">
      <Text variant="price" className="inline-block max-w-max">
        Регистрация
      </Text>
      <form
        onSubmit={handleSubmit(onSubmitReady)}
        className="flex flex-col w-full gap-5"
      >
        <div>
          <Input
            variant="underline"
            placeholder="Имя"
            register={register("name")}
          />
          {errors.name?.message && (
            <Text variant="error" className="mt-2 ml-2">
              {errors.name?.message}
            </Text>
          )}
        </div>

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
            type="password"
            placeholder="Пароль"
            register={register("password")}
          />
          {errors.password?.message && (
            <Text variant="error" className="mt-2 ml-2">
              {errors.password?.message}
            </Text>
          )}
        </div>

        <div>
          <Input
            variant="underline"
            type="password"
            placeholder="Подтвердите пароль"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <Text variant="error" className="mt-2 ml-2">
              {errors.confirmPassword?.message}
            </Text>
          )}
        </div>

        <div className="flex justify-between">
          <Text
            variant="description"
            className="flex gap-2 items-center cursor-default"
          >
            <input type="checkbox" id="remember"></input>
            <label htmlFor="remember">Запомнить меня?</label>
          </Text>
          <Button type="submit" variant="primary" title="Регистрация" />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
