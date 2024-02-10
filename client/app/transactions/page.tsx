'use client'
import { useEffect,useState, useContext,useRef } from "react";
import { TransactionType } from "@/components/MainComponent";
import { ModalContext } from "@/components/MainComponent";
import TransactionRow from "@/components/TransactionRow";

function Transactions() {
    const [transactions,setTransactions] = useState<TransactionType[]>([])
    const modal = useRef(useContext(ModalContext))

    

    useEffect(() => {
        // runs twice in dev
        const getTransactions = async() => {
            await fetch('/api/fetchTransactions',{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            }).then(async(res:Response)=>{
                let getTransactions = await res.json()
                if(getTransactions.length<=0){
                    modal.current.setShowModal((prev)=>true)
                }else{
                    setTransactions(getTransactions)
                }
            })
        }
        getTransactions()
        const interval = setInterval(getTransactions, 3000);
        return () => clearInterval(interval);
      }, []);

    return (
        <div className=" grid grid-cols-3 gap-4 h-full overflow-y-auto xl:pr-2" id="custom-scroll">
            <div className="box flex flex-col gap-2 p-6 text-sm col-span-3">
                <div className="font-medium text-base">Latest Transactions</div>
                {
                    transactions.length>0?transactions.map((transaction)=>
                    <TransactionRow key={transaction.name+Math.random().toString()} transaction={transaction}/>
                    ):
                    <small>Start by adding a transaction</small>
                }
                
                
            </div>
        </div>
    );
}

export default Transactions;