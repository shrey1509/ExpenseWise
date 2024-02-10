'use client'
import { useState,createContext } from "react";
import CreateTransactionModal from "./CreateTransactionModal";

// to use with any transaction
export type TransactionType = {
    name: string,
    amount: string,
    category: string,
    type: string,
    date: string,
    description: string
}

type ModalType = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,

}
const ModalDefault = {
    showModal: false,
    setShowModal: () => {},
}

// to make modal available globally
export const ModalContext = createContext<ModalType>(ModalDefault);


function MainComponent({children}:{children:any}) {
    const [showModal,setShowModal] = useState(false)

    return (
        <ModalContext.Provider value={{showModal,setShowModal}}>
            {children}
            <CreateTransactionModal/>
            <div onClick={()=>setShowModal((prev)=>true)} className=" cursor-pointer flex rounded-full shadow-lg bg-secondary text-white px-4 py-2 xl:px-6 xl:py-3 fixed bottom-8 xl:bottom-12 right-8 xl:right-16">
                + <span className=" hidden xl:block">Add new transaction</span>
            </div>
        </ModalContext.Provider>
    );
}

export default MainComponent;