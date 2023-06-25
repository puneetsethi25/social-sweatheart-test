/**
 * Class representing an ExpenseType which includes properties: name, overExpenseLimit.
 */
class ExpenseType {

    /**
     * Creates new instance of the ExpenseType class.
     * @param {string} name - The name of the expense type Eg. breakfsat, lunch, dinner etc
     * @param {integer} overExpenseLimit - a limit, beyond which it would be considerd as overExpensive.
     */
    constructor(name, overExpenseLimit) {
        this.name = name;
        this.overExpenseLimit = overExpenseLimit;
    }
}

module.exports = ExpenseType;
