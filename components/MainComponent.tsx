'use client'
import { useState,createContext } from "react";
import CreateTransactionModal from "./CreateTransactionModal";


type ModalType = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,

}
const ModalDefault = {
    showModal: false,
    setShowModal: () => {},
}

export const ModalContext = createContext<ModalType>(ModalDefault);


function MainComponent({children}:{children:any}) {
    const [showModal,setShowModal] = useState(false)

    return (
        <ModalContext.Provider value={{showModal,setShowModal}}>
            {children}
            <CreateTransactionModal/>
            <div onClick={()=>setShowModal((prev)=>true)} className=" cursor-pointer rounded-full shadow-lg bg-darkBg text-white px-6 py-3 fixed bottom-16 right-16">
                + Add new transaction
            </div>
        </ModalContext.Provider>
    );
}

export default MainComponent;