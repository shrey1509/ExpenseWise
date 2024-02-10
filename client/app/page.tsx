'use client'
import Image from "next/image";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useState,useEffect,useContext,useRef } from "react";
import {ChartSeries,defaultChartSeries,defaultChartOptions,defaultDonutSeries,defaultDonutOptions} from '@/components/UIOptions'
import { TransactionType } from "@/components/MainComponent";
import { ModalContext } from "@/components/MainComponent";
import TransactionRow from "@/components/TransactionRow";
import { useRouter } from "next/navigation";
// To avoid SSR conflicts
import useScreenSize from "@/components/hooks/MobileDetect";

// Wrapped in useRef to avoid on load conflicts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Home() {
  const [overviewStats,setOverviewStats] = useState({monthlyIncome:0,monthlyExpenses:0,monthlyProfit:0})
  const [transactions,setTransactions] = useState<TransactionType[]>([])
  const router = useRouter()
  // Custom hook to detect screen size
  const modal = useRef(useContext(ModalContext))
  // Apex chart setters
  const currentDevice = useScreenSize()

  const [transactionStats, setTransactionStats] = useState<{ series: ChartSeries; options: ApexOptions }>({
    series: defaultChartSeries,
    options: defaultChartOptions,
  });
  const [expenseStats, setExpenseStats] = useState<{ series: number[]; options: ApexOptions }>({
    series: defaultDonutSeries,
    options: defaultDonutOptions,
  });
  
  useEffect(() => {
    // runs twice in dev
    const getOverview = async() => {
      await fetch('/api/fetchOverview',{
          method: 'GET',
          headers: {
          'Content-Type': 'application/json'
          },
      }).then(async(res:Response)=>{
          let getTransactions = await res.json()
          if(getTransactions.transactions.length<=0){
            modal.current.setShowModal((prev)=>true)
          }else{
            setOverviewStats({monthlyIncome:getTransactions.monthlyIncome,monthlyExpenses:getTransactions.monthlyExpenses,monthlyProfit:getTransactions.monthlyProfit})
            setTransactionStats({series:[{name:'Sent',data:getTransactions.dailyExpenses},{name:'Received',data:getTransactions.dailyIncome}],options:defaultChartOptions})
            setTransactions(getTransactions.transactions)
            let getPieOptions = defaultDonutOptions
            getPieOptions.labels = Object.keys(getTransactions.expensesByCategory)
            setExpenseStats({series:Object.values(getTransactions.expensesByCategory),options:getPieOptions})
          }
  
        })
    }
    getOverview()
    // To keep fetching data
    const interval = setInterval(getOverview, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-4 gap-4 h-full overflow-y-auto overflow-x-hidden pr-1 xl:pr-2" id="custom-scroll">
      <div className="box flex flex-col gap-2 p-3 xl:p-6 text-sm xl:col-span-1">
        <div className="font-medium text-sm xl:text-base">Monthly Income</div>
        <div className=" text-xl font-semibold">{overviewStats.monthlyIncome} Rs.</div>
      </div>
      <div className="box flex flex-col gap-2 p-3 xl:p-6 text-sm xl:col-span-1">
        <div className="font-medium text-sm xl:text-base">Monthly Expenses</div>
        <div className=" text-xl font-semibold">{overviewStats.monthlyExpenses} Rs.</div>
      </div>
      <div className="box flex flex-col gap-2 p-3 xl:p-6 text-sm xl:col-span-1">
        <div className="font-medium text-sm xl:text-base">Monthly Savings</div>
        <div className={`${overviewStats.monthlyProfit<=0?'text-red-600':'text-green-600'} text-xl font-semibold`}>{overviewStats.monthlyProfit} Rs.</div>
      </div>
      <div className="box flex flex-col xl:col-span-2 gap-2 p-3 xl:p-6 text-sm">
        <div className="font-medium text-sm xl:text-base">Transaction Statistics</div>
        <div className="flex w-full justify-center">
          <Chart options={transactionStats.options} series={transactionStats.series} type="area" height={250} width={currentDevice.width>500?400:300} />
        </div>
      </div>
      <div className="box flex flex-col gap-2 p-3 xl:p-6 text-sm xl:col-span-2">
        <div className="font-medium text-sm xl:text-base">Expense Statistics</div>
        <div className="flex w-full h-full justify-center items-center">
          <Chart options={expenseStats.options} series={expenseStats.series} type="donut" height={300}  width={300}/>
        </div>
      </div>
      <div className="box flex flex-col gap-2 p-3 xl:p-6 text-sm xl:col-span-4">
        <div className="font-medium text-sm xl:text-base">Latest Transactions</div>
        {
          transactions.length>0?transactions.map((transaction)=>
            <TransactionRow key={transaction.name+Math.random().toString()} transaction={transaction} />
          ):
          <small>Start by adding a transaction</small>
        }
        <small className=" mt-3 text-secondary cursor-pointer" onClick={()=>router.push('/transactions')}>See More</small>
      </div>
    </div>
  );
}
