"use client"
import { CustomerInterface } from "@/util/Customer.type"
import { TicketInterface } from "@/util/Ticket.type"
import { ReactNode, useState } from "react"
import { createContext } from "vm"

interface ModalContextData {
    visible: boolean
    handleModalVisible: () => void
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);

    function handleModalVisible() {
        setVisible(!visible)
    }
    return (
        <ModalContext.Provider value={ }>
            {children}
        </ModalContext.Provider>
    )
}