'use client'
import Image from "next/image";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useState } from "react";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Home() {
  const defaultChartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: [],
    },
  };

  type ChartSeries = {
    name: string;
    data: number[];
  }[];
  const defaultChartSeries: ChartSeries = [{ name: '', data: [] }];

  const defaultDonutOptions: ApexOptions = {
    chart: {
      height: 200,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: [],
    },
  };

  type DonutSeries = {
    name: string;
    data: number[];
  }[];
  const defaultDonutSeries: DonutSeries = [{ name: '', data: [] }];
  const [transactionStats, setTransactionStats] = useState<{ series: ChartSeries; options: ApexOptions }>({
    series: defaultChartSeries,
    options: defaultChartOptions,
  });
  const [expenseStats, setExpenseStats] = useState<{ series: DonutSeries; options: ApexOptions }>({
    series: defaultDonutSeries,
    options: defaultDonutOptions,
  });
  return (
    <main className=" grid grid-cols-3 gap-4 h-full overflow-y-auto">
      <div className="box flex flex-col gap-2 p-6 text-sm">
        <div className="font-medium text-base">Monthly Income</div>
        <div className=" text-xl font-semibold">Rs.10,000</div>
      </div>
      <div className="box flex flex-col gap-2 p-6 text-sm">
        <div className="font-medium text-base">Monthly Expenses</div>
        <div className=" text-xl font-semibold">Rs.10,000</div>
      </div>
      <div className="box flex flex-col gap-2 p-6 text-sm">
        <div className="font-medium text-base">Monthly Savings</div>
        <div className=" text-xl font-semibold">Rs.10,000</div>
      </div>
      <div className="box flex flex-col col-span-2 gap-2 p-6 text-sm">
        <div className="font-medium text-base">Transaction Statistics</div>
        <div className="flex w-full justify-center">
          <Chart options={transactionStats.options} series={transactionStats.series} type="area" height={350} width={500} />
        </div>
      </div>
      <div className="box flex flex-col gap-2 p-6 text-sm">
        <div className="font-medium text-base">Expense Statistics</div>
        <Chart options={expenseStats.options} series={expenseStats.series} type="donut" height={200} width={200} />
      </div>
      <div className="box flex flex-col gap-2 p-6 text-sm col-span-3">
        <div className="font-medium text-base">Latest Transactions</div>
        <div className="flex p-2 justify-between gap-3 border-b-[1px]">
          <div className="">Name</div>
          <div className=" font-medium">Rs.128</div>
          <div className=" text-sm rounded-full px-3 py-1 bg-lightBg">Category</div>
          <div className=" font-light"> 7 Jun 2023, 5 PM</div>
        </div>
        <div className="flex p-2 justify-between gap-3 border-b-[1px]">
          <div className="">Name</div>
          <div className=" font-medium">Rs.128</div>
          <div className=" text-sm rounded-full px-3 py-1 bg-lightBg">Category</div>
          <div className=" font-light"> 7 Jun 2023, 5 PM</div>
        </div>
        <div className="flex p-2 justify-between gap-3 border-b-[1px]">
          <div className="">Name</div>
          <div className=" font-medium">Rs.128</div>
          <div className=" text-sm rounded-full px-3 py-1 bg-lightBg">Category</div>
          <div className=" font-light"> 7 Jun 2023, 5 PM</div>
        </div>
      </div>
    </main>
  );
}
