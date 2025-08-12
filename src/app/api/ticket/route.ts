import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prisma.tickets.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json({ error: "Filed update ticket" }, { status: 400 });
  }

  try {
    await prisma.tickets.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json(
      { message: "Chamado atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Filed update ticket" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json(
      { error: "Failed create new ticket 1" },
      { status: 400 }
    );
  }

  try {
    await prisma.tickets.create({
      data: {
        name: name,
        description: description,
        status: "ABERTO",
        customerId: customerId,
      },
    });

    return NextResponse.json(
      { mensagem: "Failed create new ticket" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new ticket" },
      { status: 400 }
    );
  }
}
