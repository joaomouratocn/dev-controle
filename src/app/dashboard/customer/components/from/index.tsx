"use client";

import { Input } from "@/components/input/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  name: z.string().min(1, "Campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email valído")
    .min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message:
        "O numero de telefone deve esta no seguinte formato: (DD) 999999999",
    }
  ),
  address: z.string(),
});

type formData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter()

  async function handlerRegisterCustomer(data: formData) {
    await api.post('/api/customer', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      userId: userId,
      address: data.address
    })

    router.refresh()
    router.replace("/dashboard/customer")

  }
  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handlerRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome Completo:</label>
      <Input
        type="text"
        name="name"
        error={errors.name?.message}
        register={register}
        placeHolder="Digite o nome completo"
      />

      <section className="flex gap-2 flex-col sm:flex-row my-2">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-lg font-medium">Telefone:</label>
          <Input
            type="text"
            name="phone"
            error={errors.phone?.message}
            register={register}
            placeHolder="Tefefone EX. (11)987654321"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="mb-1 text-lg font-medium">Email:</label>
          <Input
            type="email"
            name="email"
            error={errors.email?.message}
            register={register}
            placeHolder="Digite o email"
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço:</label>
      <Input
        type="text"
        name="address"
        error={errors.address?.message}
        register={register}
        placeHolder="Digite o endereço completo"
      />

      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold cursor-pointer hover:bg-blue-700 duration-300"
      >
        Cadastrar
      </button>
    </form>
  );
}
