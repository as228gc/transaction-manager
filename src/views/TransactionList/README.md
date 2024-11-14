# TransactionList

The TransactionList component displays a list of financial transactions and allows users to delete specific transactions. It uses tra-ma package's Transaction class to handle transactions and communicates with a parent component to handle deletion.

## Dependencies

- tra-ma: Transaction class


## Props

The TransactionList component accepts following props:

- transactions: An array of Transaction objects to display in the list.
- onDelete: A function that receives a transaction ID when a transaction is deleted.

## Usage

Example:
```jsx
import React from 'react';
import { TransactionList } from './path/to/TransactionList';
import { Transaction } from 'tra-ma';

function App() {
 const transactions = [/* Array of transactions */];
  
  function handleDelete(id) {
    // Implement delettion logic
  }

  return (
    <div>
      <h1>Transaction List</h1>
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}
```