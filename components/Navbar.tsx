'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

function Navbar() {
    const path = usePathname()!

    return (
        <div className=" flex flex-col h-full box items-start gap-6 p-default">
            <Link className=" flex mb-10 items-center gap-2" href="/">
                <Image alt="logo" height={40} width={40} src="/logo.svg"/>
                <h1 className=" pt-1 text-xl">Expense<b>Wise</b></h1>
            </Link>
            <Link className={`${path == '/'?' text-primary':''} flex items-center gap-4 font-medium`} href="/">
                <Image src="/navbar/home.svg" height={20} width={20} alt="home" />
                Overview
            </Link>
            <Link className={`${path == '/transactions'?' text-primary':''} flex items-center gap-4 font-medium`} href="/transactions">
                <Image src="/navbar/transactions.svg" height={20} width={20} alt="transactions" />
                Transactions
            </Link>
        </div>
    );
}

export default Navbar;