/**
 * Class representing an Expense which contains properties such as expense type, amount and currency.
 * This class is responsible for encapsulating an expense, providing a conversion utility to the default currency and checking if the expense is over the specified limit.
 * 
 * @property {ExpenseType} expenseType - An instance of the ExpenseType class, representing the type of the expense.
 * @property {number} amount - The expense amount.
 * @property {string} currency - The currency of the expense amount. Defaults to 'EUR'.
 * @property {Object} currencyConversionRate - An object where the keys are the supported currency types and the values are the corresponding conversion rates to the default currency ('EUR'). Static property.
 */
class Expense {

    static currencyConversionRate = {
        'EUR': 1,
        'USD': 0.85,
    };

    /**
     * Creates a new instance of the Expense class.
     * 
     * @param {ExpenseType} expenseType - The type of the expense.
     * @param {number} amount - The expense amount.
     * @param {string} [currency='EUR'] - The currency of the expense amount.
     */
    constructor(expenseType, amount, currency = 'EUR') {
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Invalid expense amount. It must be a non-negative number.');
        }
        if (!Expense.currencyConversionRate[currency]) {
            throw new Error(`Unsupported currency '${currency}'. Supported currencies are: [${Object.keys(Expense.currencyConversionRate).join(', ')}]`);
        }
        this.expenseType = expenseType;
        this.amount = amount;
        this.currency = currency;
    }

    /**
     * Converts the expense amount to the default currency using the conversion rate specified in the `currencyConversionRate` static property.
     * 
     * @returns {number} - The expense amount converted to the default currency.
     */
    convertToDefaultCurrency() {
        return this.amount * Expense.currencyConversionRate[this.currency];
    }

    /**
     * Checks if the expense amount exceeds the over expense limit of its type.
     * 
     * @returns {boolean} - Returns true if the expense amount exceeds its type's over expense limit, else false.
     */
    isOverExpense() {
        return this.amount > this.expenseType.overExpenseLimit;
    }
}

module.exports = Expense;
