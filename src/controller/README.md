# Controller

The Controller component is the main part of a transaction manager app that handles and displays different views for managing transactions. It allows users to create, view, and delete transactions, and it can also generate a report based on the stored data.

## Dependencies

* tra-ma: Provides classes such as ExpenseTransaction, IncomeTransaction, TransactionProcessor, and ReportGenerator.
* LocalStorageManager: Manages transactions in localStorage.
* IdGenerator: Generates ids for transactions.

### Example

```jsx
function App() {
  return (
    <div className="App">
      <h1>Transaction Manager</h1>
      <Controller />
    </div>
  );
}
```

## Component structure

### State variables

- currentView: Manages which view is currently displayed (EXPENSE_FORM, INCOME_FORM, TRANSACTION_LIST, or REPORT).

### Methods

- handleCreateExpenseTransaction: Creates and stores a new expense transaction based on user input.
- handleCreateIncomeTransaction: Creates and stores a new income transaction based on user input.
- handleDeleteTransaction: Deletes a transaction by ID from both the transaction processor and localStorage.

### Views

The Controller component renders different views based on the value of currentView:

1. Expense Form: Allows users to enter details for a new expense transaction.
2. Income Form: Allows users to enter details for a new income transaction.
3. Transaction List: Displays all stored transactions with an option to delete individual transactions.
4. Report View: Generates a financial report based on the transaction history.

### Buttons
The component has four buttons, each showing a different view based on the selected option.

- Create new expense transaction: Opens the form for entering a new expense transaction.
- Create new income transaction: Opens the form for entering a new income transaction.
- Display all transactions: Shows a list of all created transactions.
- Create report: Displays a report based on all stored transactions.
