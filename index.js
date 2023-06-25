const ExpenseType = require('./classes/ExpenseType');
const Expense = require('./classes/Expense');
const Report = require('./classes/Reports');
const samplePayload = require('./sample.json')
const { MAX_EXPENSE_LIMIT, API_BASE_URL } = require('./constants');
const axios = require('axios');

const fetchExpenses = async () => {
    try {
        console.log(`Fetching input from API...`)
        const response = await axios.post(API_BASE_URL, samplePayload);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
}
const buildInput = async () => {
    let expenses = [];
    const apiResult = await fetchExpenses();
    console.log(`Input fetched successfully.`)
    console.log(`Building input...`)
    if (apiResult.status == 'success' && apiResult.data.length >= 1) {
        let classes = {};
        for (const exp of MAX_EXPENSE_LIMIT) {
            const name = exp.type.replace(/ /g, '_').toUpperCase();
            classes[name] = new ExpenseType(exp.type, exp.limit);
        }
        for (const input of apiResult.data) {
            expenses.push(new Expense(classes[input.type.replace(/ /g, '_').toUpperCase()], input.amount, input.currency));
        }
    }
    console.log(`Input build successful.`)
    return expenses;
}
const _run = () => {
    buildInput().then((expenses) => {
        const report = new Report(expenses);
        console.info(`Today Travel Expenses as on ${new Date().toISOString().slice(0, 10)}`);
        const response = report.generate();
        console.log('----- Sunmary -----')
        console.info(`Meal expenses: ${response.meals}${report.defaultCurrency}`);
        console.info(`Non-meal expenses: ${response.nonMeals}${report.defaultCurrency}`);
        console.info(`Total expenses: ${response.total}${report.defaultCurrency}`);
        console.log('----- Details -----')
        for (const expense of response.expenseDetails) {
            console.log(`${expense.name}: ${expense.amount}${expense.currency} ${expense.isOverExpense ? "[over-expense!]" : ""}`)
        }
        console.log('----- End -----');
    }).catch(error => {
        console.error(error.message);
    });
}

_run();
