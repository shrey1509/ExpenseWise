'use client'
import { useState } from "react";
import { TransactionType } from "./MainComponent";

function TransactionRow({transaction}:{transaction:TransactionType}) {
    const [showDescription,setShowDescription] = useState(false)
    return (
        <div className="flex cursor-pointer flex-col border-b-[1px]" onMouseEnter={()=>setShowDescription((prev)=>true)} onMouseLeave={()=>setShowDescription((prev)=>false)} onClick={()=>setShowDescription((prev)=>!prev)}>
            <div className="grid grid-cols-3 xl:grid-cols-4 p-2 xl:gap-3 ">
                <div className=" truncate">{transaction.name}</div>
                <div className=" font-medium">Rs.{transaction.amount}</div>
                <div className=" hidden xl:block text-sm rounded-full w-min px-3 py-1 bg-lightBg">{transaction.category}</div>
                <div className=" font-light text-xs">{new Date(transaction.date).toLocaleString()}</div>
            
            </div>
            <div className={`${showDescription==true?'block':'hidden'} text-sm p-2 flex justify-between gap-2`}>
                <p >{transaction.description}</p>
                <div className=" xl:hidden block rounded-full w-min px-3 py-1 bg-lightBg">{transaction.category}</div>

            </div>
        </div>
    );
}

export default TransactionRow;