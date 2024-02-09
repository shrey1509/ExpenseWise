import { useState,useContext } from "react"
import Image from "next/image";
import { ModalContext } from "./MainComponent";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

function CreateTransactionModal() {
    const modal = useContext(ModalContext);
    const defaultInputs = {name:"",amount:0,category:"GE",type:"sent",date:new Date(),description:""}
    const [transactionInputs, setTransactionInputs] = useState(defaultInputs);
    const [errorFor, setErrorFor] = useState({name:false,amount:false});
    const [showDate,setShowDate] = useState(false)

    const handleChange = (name:string,value:any) => {
        setTransactionInputs(values => ({...values, [name]: value}))
    }

    const handleValidation = () => {
        let hasError = false
        if(transactionInputs.name==""){
            setErrorFor({...errorFor,name:true})
            hasError = true
        }
        if(transactionInputs.amount==0){
            setErrorFor({...errorFor,amount:true})
            hasError = true
        }
        return hasError
    }

    const handleSubmit = async(event:any) => {
        event.preventDefault();
        let hasError = handleValidation()
        if(!hasError){
            await fetch('/api/createTransaction',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionInputs)
            }).then(()=>{
                modal.setShowModal((prev)=>false)
                setTransactionInputs(defaultInputs)
            })
        }
    }

    return (
        <div id="transaction-modal" tabIndex={-1} aria-hidden="true" className={` ${modal.showModal?'':'hidden'} bg-gray-900/10 inset-0 overflow-y-auto  overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative p-4 w-full max-w-xl xl:-mt-20 max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold ">
                            Create New Transaction
                        </h3>
                        <button onClick={()=>modal.setShowModal((prev)=>false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " >
                            <Image alt="logo" height={10} width={10} src="/header/close.svg"/>
                        </button>
                    </div>
                    <form onSubmit={(e)=>handleSubmit(e)} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium ">Name</label>
                                <input type="text" name="name" id="name" className={`bg-gray-50 border ${errorFor.name?'border-red-500':'border-gray-300'} text-sm rounded-lg focus:border-primary-600 block w-full p-2.5`} placeholder="Enter name of sender/recipient" value={transactionInputs.name} required onChange={(e)=>handleChange(e.target.name,e.target.value)}/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium ">Amount</label>
                                <input type="number" name="amount" id="amount" className={`bg-gray-50 border ${errorFor.amount?'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 `} placeholder="Enter amount in Rs." min={0} required value={transactionInputs.amount} onChange={(e)=>handleChange(e.target.name,e.target.value)}/>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                <select id="category" name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-500 block w-full p-2.5" value={transactionInputs.category} onChange={(e)=>handleChange(e.target.name,e.target.value)}>
                                    <option value="General">General</option>
                                    <option value="Family">Family</option>
                                    <option value="Subscription">Subscription</option>
                                    <option value="Bill Payment">Bill Payment</option>
                                    <option value="Leisure">Leisure</option>
                                    <option value="Travel">Travel</option>
                                </select>
                            </div>
                            <div className="col-span-2 flex gap-2">
                                <div className="flex items-center">
                                    <input defaultChecked={transactionInputs.type=="sent"?true:false} id="radio-1" onChange={(e)=>handleChange(e.target.name,e.target.value)} type="radio" value="sent" name="type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
                                    <label htmlFor="radio-1" className="ms-2 text-sm font-medium ">Sent</label>
                                </div>
                                <div className="flex items-center">
                                    <input defaultChecked={transactionInputs.type=="received"?true:false} id="radio-2" onChange={(e)=>handleChange(e.target.name,e.target.value)} type="radio" value="received" name="type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
                                    <label htmlFor="radio-2" className="ms-2 text-sm font-medium ">Received</label>
                                </div>

                            </div>
                            <Datetime value={transactionInputs.date} onChange={(e:any)=>handleChange("date",e.toDate())}/>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium ">Product Description</label>
                                <textarea name="description" value={transactionInputs.description} id="description" rows={2} className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300  focus:border-blue-500 " placeholder="Write product description here" onChange={(e)=>handleChange(e.target.name,e.target.value)}></textarea>                    
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-secondary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            +
                            Add new product
                        </button>
                    </form>
                </div>
            </div>
        </div> 
    );
}

export default CreateTransactionModal;