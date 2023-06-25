const ExpenseType = require('./classes/ExpenseType');
const Expense = require('./classes/Expense');
const Report = require('./classes/Reports');

const type = {
  BREAKFAST: new ExpenseType('Breakfast', 20),
  LUNCH: new ExpenseType('Lunch', 50),
  DINNER: new ExpenseType('Dinner', 100),
  CAR_RENTAL: new ExpenseType('Car Rental', 0)
}

const expenses = [
  new Expense(type.BREAKFAST, 15.20, 'EUR'),
  new Expense(type.BREAKFAST, 28.10, 'EUR'),
  new Expense(type.LUNCH, 10.20, 'EUR'),
  new Expense(type.DINNER, 16.00, 'EUR'),
  new Expense(type.CAR_RENTAL, 120.20, 'EUR')
];


describe('Expense reporter', () => {
  test('Expense is correctly identified as over expense', () => {
    const breakfastType = new ExpenseType('Breakfast', 20);
    const breakfastExpense = new Expense(breakfastType, 21);
    expect(breakfastExpense.isOverExpense()).toBe(true);
  });
  const report = new Report(expenses);
  const reportOutput = report.generate();

  test('Report is generated correctly for Meals', () => {
    // Verify that the meal expenses were calculated correctly
    expect(reportOutput.meals).toBe(69.5);
  });

  test('Report is generated correctly for Meals', () => {
    // Verify that the non-meal expenses were calculated correctly
    expect(reportOutput.nonMeals).toBe(120.2);
  });

  test('Report is generated correctly for Meals', () => {
    // Verify that the total expenses were calculated correctly
    expect(reportOutput.total).toBe(189.7);
  });
  // Verify the individual expense details were included correctly
  expect(reportOutput.expenseDetails).toHaveLength(5);

});
