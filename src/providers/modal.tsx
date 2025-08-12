"use client";
import { ReactNode, useState, createContext } from "react";
import { CustomerInterface } from "@/util/Customer.type";
import { TicketInterface } from "@/util/Ticket.type";
import { ModalTicket } from "@/components/modal";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (detail: TicketInfo) => void;
}

export const ModalContext = createContext({} as ModalContextData);

interface TicketInfo {
  ticket: TicketInterface;
  customer: CustomerInterface | null;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible() {
    setVisible(!visible);
  }

  function setDetailTicket(detail: TicketInfo) {
    setTicket(detail);
  }
  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
