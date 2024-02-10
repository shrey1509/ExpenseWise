const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fsPromises = require('fs/promises');

const app = express();


app.use(bodyParser.json());

const dataFilePath = path.join(process.cwd(), 'db.json');

// Adding a new transaction
app.post('/createTransaction', async(req, res) => {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    objectData.transactions.push(req.body)
    await fsPromises.writeFile(dataFilePath, JSON.stringify(objectData));
    res.json({"msg":"Transaction added"});
});

// For transactions page
app.get('/fetchTransactions', async(req, res) => {
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    res.json(objectData.transactions.reverse());
});

// For overview dashboard
app.get('/fetchOverview', async(req, res) => {
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

    res.json({"monthlyIncome":monthlyIncome,"monthlyExpenses":monthlyExpenses,"monthlyProfit":monthlyIncome-monthlyExpenses,"dailyIncome":dailyIncome,"dailyExpenses":dailyExpenses,"expensesByCategory":expensesByCategory,"transactions":objectData.transactions.reverse().slice(0,5)});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
