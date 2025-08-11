"use client";
import { api } from "@/lib/api";
import { CustomerInterface } from "@/util/Customer.type";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerInterface }) {
  const router = useRouter();

  async function handlerDeleteCustomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });
      router.refresh();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome: </a> {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email:</a> {customer.email}
      </p>
      <p>
        <a className="font-bold">Telefone:</a> {customer.phone}
      </p>
      <p>
        <a className="font-bold">Endereço:</a> {customer.address}
      </p>
      <button
        onClick={handlerDeleteCustomer}
        className="bg-red-500 px-4 mt-2 rounded text-white self-start cursor-pointer"
      >
        Deletar
      </button>
    </article>
  );
}
