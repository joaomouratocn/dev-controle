import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { string } from "zod";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handlerRegisterTicket(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prisma.tickets.create({
      data: {
        name: name as string,
        status: "ABERTO",
        userId: session?.user.id,
        description: description as string,
        customerId: customerId as string,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>

          <h1 className="text-3xl font-bold">Novo Chamado</h1>
        </div>
        <form className="flex flex-col mt-6" action={handlerRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Nome Chamado:</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Digite o nome do chamado"
            className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none"
          />

          <label className="mb-1 font-medium text-lg">
            Descreva o problema:
          </label>
          <textarea
            required
            name="description"
            placeholder="Descreva o problema..."
            className="w-full border-2 rounded-md px-2 mb-2 h-25"
          />

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda não tem cliente,{" "}
              <span className="text-blue-500 font-medium">Cadastrar</span>
            </Link>
          )}

          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente:
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
