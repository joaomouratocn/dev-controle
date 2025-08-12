import { authOptions } from "@/lib/auth";
import { PrismaClient } from "../../../generated/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
  }

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const prisma = new PrismaClient();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso!!" });
  } catch (error4) {
    return NextResponse.json(
      { error: "Failed create new customer" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const prisma = new PrismaClient();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      { error: "failed deleter customer" },
      { status: 400 }
    );
  }

  const tickets = await prisma.tickets.findFirst({
    where: {
      customerId: id,
    },
  });

  if (tickets) {
    return NextResponse.json(
      { error: "Customer have tickets" },
      { status: 400 }
    );
  }

  try {
    await prisma.customer.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json({ message: "Deletado com sucesso!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed deleter customer" },
      { status: 400 }
    );
  }
}
