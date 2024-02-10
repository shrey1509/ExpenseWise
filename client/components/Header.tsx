'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation';

function Header() {
    const [showDrawer,setShowDrawer] = useState(false)
    const path = usePathname()!

    return (
        <div className=" flex justify-between">
            <Link className=" flex items-center gap-2" href="/">
                <Image alt="logo" height={40} width={40} src="/logo.svg"/>
                <h1 className=" pt-1 text-xl">Expense<b>Wise</b></h1>
            </Link>
            <Image alt="menu" height={20} width={20} src="/header/menu.svg" className=" cursor-pointer" onClick={()=>setShowDrawer((prev)=>true)}/>

            {/* drawer */}
            
            <div  className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${showDrawer?'':'-translate-x-full'} bg-white w-80 flex flex-col gap-6`} tabIndex={-1} >
                <div className="flex items-center">
                    <Link className=" flex mb-10 items-center gap-2" href="/">
                        <Image alt="logo" height={40} width={40} src="/logo.svg"/>
                        <h1 className=" pt-1 text-xl">Expense<b>Wise</b></h1>
                    </Link>
                    <button type="button" className=" bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-4 end-2.5 flex items-center justify-center" onClick={()=>setShowDrawer((prev)=>false)}>
                        <Image alt="logo" height={10} width={10} src="/header/close.svg"/>

                    </button>
                </div>
                    
                <Link className={`${path == '/'?' text-secondary':''} flex items-center gap-4 font-medium`} href="/">
                    <Image src="/navbar/home.svg" height={20} width={20} alt="home" />
                    Overview
                </Link>
                <Link className={`${path == '/transactions'?' text-blue-600':''} flex items-center gap-4 font-medium`} href="/transactions">
                    <Image src="/navbar/transactions.svg" height={20} width={20} alt="transactions" />
                    Transactions
                </Link>
            </div>
        </div>
    );
}

export default Header;