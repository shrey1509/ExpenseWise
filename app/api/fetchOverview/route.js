import fsPromises from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server'

const dataFilePath = path.join(process.cwd(), 'db.json');


export async function GET() {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    var monthlyIncome = 0
    var monthlyExpenses = 0
    var dailyIncome = []
    var dailyExpenses = []
    var expensesByCategory = {}
    const currentMonth = new Date().getMonth();

    objectData.transactions.forEach(transaction => {
        const getDate = new Date(transaction.date);
        if(getDate.getMonth()==currentMonth){
            if(transaction.type=="sent"){
                monthlyExpenses += parseInt(transaction.amount)
                dailyExpenses.push({x:getDate,y:transaction.amount})
                if(transaction.category in expensesByCategory){
                    expensesByCategory[transaction.category] += parseInt(transaction.amount)
                }else{
                    expensesByCategory[transaction.category] = parseInt(transaction.amount)
                }
            }else if(transaction.type=="received"){
                monthlyIncome += parseInt(transaction.amount)
                dailyIncome.push({x:getDate,y:transaction.amount})
            }
        }
        
    });

    // const filteredData = objectData.transactions.filter(item => {
    //     const getMonth = new Date(item.date).getMonth();
    //     return getMonth === currentMonth;
    // });
    // monthlyIncome = filteredData.filter(item => item.type=="sent").map(item => item.amount).reduce((sum, amount) => sum + parseInt(amount), 0);
    // monthlyExpenses = filteredData.filter(item => item.type=="received").map(item => item.amount).reduce((sum, amount) => sum + parseInt(amount), 0);

    return NextResponse.json({"monthlyIncome":monthlyIncome,"monthlyExpenses":monthlyExpenses,"monthlyProfit":monthlyIncome-monthlyExpenses,"dailyIncome":dailyIncome,"dailyExpenses":dailyExpenses,"expensesByCategory":expensesByCategory,"transactions":objectData.transactions.reverse().slice(0,5)})
  
}