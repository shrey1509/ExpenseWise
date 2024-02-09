'use client'
import { useState } from "react";
import { TransactionType } from "./MainComponent";

function TransactionRow({transaction}:{transaction:TransactionType}) {
    const [showDescription,setShowDescription] = useState(false)
    return (
        <div className="flex flex-col border-b-[1px]" onMouseEnter={()=>setShowDescription((prev)=>true)} onMouseLeave={()=>setShowDescription((prev)=>false)} onClick={()=>setShowDescription((prev)=>!prev)}>
            <div key={transaction.name+Math.random().toString()} className="grid grid-cols-4 p-2 gap-3 ">
                <div className=" truncate">{transaction.name}</div>
                <div className=" font-medium">Rs.{transaction.amount}</div>
                <div className=" text-sm rounded-full w-min px-3 py-1 bg-lightBg">{transaction.category}</div>
                <div className=" font-light">{new Date(transaction.date).toLocaleString()}</div>
            
            </div>
            <p className={`${showDescription==true?'block':'hidden'} p-2`}>{transaction.description}</p>
        </div>
    );
}

export default TransactionRow;