# TransactionForm

The TransactionForm component displays a form for users to input details of a transaction, including category, amount, and date. It allows users to create both expense and income transactions and submit transactions to a parent component.

## Dependencies

- tra-ma: Used for the structure for TransactionData and categories.

## Props

The TransactionForm component takes the following props:

- handleSubmit: A function that receives the transaction data when the form is submitted.
- categories: An array of category options for the transaction type, used to populate the category dropdown.
- type: The transaction type to display in the form label.

## Usage

Example:
```jsx
function App() {
  const categories = ['Food', 'Rent', 'Utilities'];

  function handleSubmit(data: TransactionData) {
    // Handle transaction data submission
  }

  return (
    <div>
      <TransactionForm handleSubmit={handleSubmit} categories={categories} type="expense" />
    </div>
  )
}
```