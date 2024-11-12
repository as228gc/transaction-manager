import React, { useState } from "react"
import { Transaction } from "tra-ma"
import { TransactionInfo } from "./TransactionInfo/TransactionInfo"
import "./TransactionList.css"

interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [localTransactions, setLocalTransactions] = useState(transactions);

  function handleDelete(id: string) {
    setLocalTransactions(localTransactions.filter(transaction => transaction.getId() !== id));
    onDelete(id);
  }

  return (
    <ul id="transaction-list">
      {localTransactions.map((transaction) => (
        <li key={transaction.getId()} data-id={transaction.getId()}>
          <TransactionInfo onDelete={handleDelete} transaction={transaction} />
        </li>
      ))}
    </ul>
  );
}
