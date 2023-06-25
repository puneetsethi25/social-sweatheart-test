
- Refactor the code to a "more extensible & maintainable" state assuming the product will grow in complexity; in an "object-oriented" fashion. 
- Optionally try to cover what you deem as the "core domain logic" with some tests. At least one testcase is necessary.
- Take as much time as you need, but stop when you feel like you have demonstrated enough.
- Please provide a runnable fork on replit.com or other online repls.
- Wanna take it further? Fetch the input expenses from a remote API.


Further Clarifications:

- If there are ambiguities or unclarities, make the best decision on your own. We'll rely on your decisions on a daily basis!
- There's no need for any kind of backward-compatibility. You can very well change the structure of the input object.
- You may not simplify the problem space by e.g. removing non-meal expenses. However, you can of couse make it more challanging, 
  for example by adding new types of expense. That is, at the minimum, the input must include both meal & "car rental" expenses.
- We know that you can see others' code. If you choose to copycat ideas and code, that's your call.
- Please remove this comment block in your own fork.

Happy coding! 🍕
--------------------------------------------------------------------------------------------------------


Please add a short description of your refactoring rationale here within this code comment block:

1. **Separation of concerns**: In the Report class, the `isMealExpense()` method was added to check if an expense is a meal expense. This enhanced code readability and separation of concerns, as this functionality might be need in more than one place, and it makes the code more maintaineable.
   
2. **Error handling and input validation**: In the Expense constructor, error handling was added to ensure that the amount is a non-negative number and that the currency is supported. This adds robustnes to the code, preventing errors and unexpected behaviour later on.

3. **Enhanced report generation**: In the Report class, the `generate()` method now provide more detailed and flexible report. It calculates - total, meal, and non-meal expenses, also provides a detailed breakdown of each expense, including exceed-limit flag. Importantly, rather than returning a statically built message, it returns an object containing raw data, providing a higher degree of flexibility, as it can be formated and present data as needed. Thus, improving reusability and allows it to be easily integrated into a wider range of apps.

4. **Currency conversion**: A convertToDefaultCurrency method was added to the Expense class. This is a very useful feature as it allows for expenses in different currencies to be easily compared and totalled. It leverages a static currencyConversionRate object for the conversion rates.

5. **Documentation**: Finally Documentation was added to each class and method. This makes the code easier to understand and use, and it provides valuable context and detail about what each class and method does.

6.  **Refactoring the test suite**: The test cases were separated to independently test meals, non-meals, and total expenses. Each test should  focusess on one behavior, and a failure should indicate precisely which feature has issues, improving maintaibity and troubleshooting.
7.  **Sample usage**: A detailed example of how to use these classes in a real-world application is included, showcasing how to create a set of expenses, generate a report, and print the report.
The `fetchExpenses()` method uses the *axios* library to fetch expenses data from a remote API. In this case I;ve used AWS Lambda fuction. Added the `buildInput()` method, which *awaits* the response from `fetchExpenses()`, constructs expense instances with the data fethed, and returns an array of instances.
In the `_run()` method, I call `buildInput()` to get our list of expenses, instantiate the `Report` class with these expenses, and used the `generate()` method of the `Report` class to produce an expense report. The report ahs a brakedown of meal, non-meals, and total expenses, and also the detialed list of all expenses. If an expense exceeds the specified limit, this is indicated in the report.
I then call `_run()` to execute this sequence of operations. The process also demonstrates how to handle promises and asynchronous code execution, as the function waits for the response from the API before proceeding to next exeutiion.
--------------------------------------------------------------------------------------------------------
