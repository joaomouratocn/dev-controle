"use client";

import { FiFile, FiCheckSquare } from "react-icons/fi";
import { CustomerInterface } from "@/util/Customer.type";
import { TicketInterface } from "@/util/Ticket.type";
import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { useContext } from "react";
import { useRouter } from "next/navigation";

interface ReceivedProps {
  ticket: TicketInterface;
  customer: CustomerInterface | null;
}

export function TicketItem({ ticket, customer }: ReceivedProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);
  async function handlerChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({ ticket: ticket, customer: customer });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-2">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-center">
          <button className="mr-4 cursor-pointer" onClick={handlerChangeStatus}>
            <FiCheckSquare size={24} color="#131313" />
          </button>

          <button className="cursor-pointer" onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
