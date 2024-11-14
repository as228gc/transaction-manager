# Transaction Manager

The Transaction Manager is a web application designed to help users manage their finances by creating, viewing, and categorizing transactions. Users can add both income and expense transactions, view summaries, and generate financial reports based on saved transaction data. The application uses localStorage to save transaction data for persistence.

## Components

### 1. Controller

The Controller component is the main component of the application. It manages state, controls which view to display, and handles events such as creating, deleting, and displaying transactions. It also generates reports based on transaction properties.

### 2. TransactionForm

The TransactionForm component displays a form for users to input information for new transactions, including category, amount, and date. This component supports different transaction types (income and expense) and lists categories based on the selected type.

### 3. TransactionList

The TransactionList component displays a list of transactions, each displayed as a  TransactionInfo component. It allows users to delete transactions and keeps the list updated with any changes.

### 4. TransactionInfo

The TransactionInfo component shows the details of a transaction, such as the date, type, category, and amount. It also displays a delete button to remove the transaction.

### 5. ReportView

The ReportView component displays a financial report with details such as start and end dates, total income, total expenses, and summaries of income and expenses by category.

## Dependencies

- tra-ma: A package providing classes and enums, including Transaction, ExpenseTransaction, IncomeTransaction, TransactionType, and Report.
- React: A JavaScript library for building user interfaces.
- localStorage: Used for storing transaction data to persist information across user sessions.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:as228gc/transaction-manager.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run build
   ```

   ```bash
   npm run dev
   ```

## Usage

After starting the application, users can:

1. Add Transactions: Select "Create new expense transaction" or "Create new income transaction" to open a form for adding a transaction with information like category, amount, and date.
2. View Transactions: Select "Display all transactions" to see a list of all saved transactions.
3. Generate a Report: Select "Create report" to view a financial report, which summarizes income, expenses, and categorized income and expenses.

Example:
```jsx

function App() {
  return (
    <div>
      <h1>Financial Transaction Manager</h1>
      <Controller />
    </div>
  )
}
```