/**
 * Class representing a Report which contains a list of expenses.
 * This class allows the creation of a report to detail the expenses, including total expenses and meal expenses.
 * The report also flags any expenses that exceed their type's limit.
 * 
 * @property {Expense[]} expenses - An array of instances of the Expense class, representing the expenses to report.
 * @property {string} defaultCurrency - The currency to use when reporting the expenses. Defaults to 'EUR'.
 * @property {string[]} meals - An array of strings representing the types of expenses considered as meals. Static property.
 */
class Report {

    static meals = ['Dinner', 'Breakfast', 'Lunch'];
    /**
     * Creates a new instance of the Report class.
     * 
     * @param {Expense[]} expenses - The expenses to report.
     * @param {string} [defaultCurrency='EUR'] - The currency to use when reporting the expenses.
     * @throws {Error} Throws an error if the expense amount is not a non-negative number.
     * @throws {Error} Throws an error if the currency is not supported.
     */
    constructor(expenses, defaultCurrency = 'EUR') {
        this.expenses = expenses;
        this.defaultCurrency = defaultCurrency;
    }

    /**
     * Checks if the provided expense is a meal expense.
     * 
     * @param {string} expense - The name of the expense type to check.
     * @returns {boolean} Returns true if the expense is a meal expense, else false.
     */
    isMealExpense(expense) {
        return Report.meals.includes(expense);
    }

    /**
     * Generates a report detailing each expense.
     * The report includes the total expenses and the meal expenses.
     * Any expenses that exceed their type's limit are flagged.
     * 
     * @returns {Object} The generated report. Contains the total expense amount, the meal expense amount, and the non-meal expense amount, each converted to the default currency. Also contains a detailed breakdown of each expense.
     */
    generate() {
        let expensesReport = {
            total: 0,
            meals: 0,
            nonMeals: 0,
            expenseDetails: []
        }
        for (const expense of this.expenses) {
            let convertedAmount = expense.convertToDefaultCurrency();
            expensesReport.total += convertedAmount;
            if (this.isMealExpense(expense.expenseType.name)) {
                expensesReport.meals += expense.amount;
            } else {
                expensesReport.nonMeals += expense.amount;
            }
            expensesReport.expenseDetails.push({
                name: expense.expenseType.name,
                amount: expense.amount,
                currency: expense.currency,
                isOverExpense: expense.isOverExpense()
            });
        }
        return expensesReport;
    }
}

module.exports = Report;
