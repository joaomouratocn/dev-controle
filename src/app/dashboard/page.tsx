import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    redirect("/");
  }

  const tickets = await prisma.tickets.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
  });

  return (
    <main>
      <Container>
        <main className="mt-9 mb-2">
          <div className="flex itens justify-between">
            <h1 className="text-3xl font-bold">Chamados</h1>
            <Link
              href="/dashboard/new"
              className="bg-blue-500 px-4 py-1 rounded text-white"
            >
              Novo Chamado
            </Link>
          </div>
          <table className="min-w-full my-2">
            <thead>
              <tr>
                <th className="font-medium text-left pl-1">CLIENTE</th>
                <th className="font-medium text-left hidden sm:block">
                  CADASTRO
                </th>
                <th className="font-medium text-left">STATUS</th>
                <th className="font-medium text-center">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length !== 0 &&
                tickets.map((ticket) => (
                  <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                    customer={ticket.customer}
                  />
                ))}
            </tbody>
          </table>
          {tickets.length === 0 && (
            <h1 className="mt-10 text-gray-400 font-bold w-full text-center">
              Sem chamados abertos
            </h1>
          )}
        </main>
      </Container>
    </main>
  );
}
