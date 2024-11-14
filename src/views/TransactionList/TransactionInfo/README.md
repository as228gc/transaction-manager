# TransactionInfo

The TransactionInfo component displays information about a transaction. It shows transaction properties like date, type, category, and amount, and displays a delete button to remove the transaction.

## Features

- Display Transaction Details: Shows information including date, type (expense or income), category, and amount.
- Delete Transaction: Allows deletion of the transaction with a button that triggers a callback function passed in as a prop.

## Dependencies

- tra-ma: The classes Transaction, ExpenseTransaction and enum TransactionType.

## Props

The TransactionInfo component takes the following props:

- transaction: A Transaction instance containing the details of the transaction.
- onDelete: A function that takes a transaction ID as an argument, called when the delete button is clicked.

## Usage

Example:
```jsx
function App() {
  const sampleTransaction = new ExpenseTransaction(new Date(), 50, "id_123", ExpenseCategory.FOOD);

  function handleDelete(id) {
    // Handle deletion logic here
  }

  return (
    <div>
      <TransactionInfo transaction={sampleTransaction} onDelete={handleDelete} />
    </div>
  );
}
```