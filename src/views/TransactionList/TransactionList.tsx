import React from "react"
import { Transaction } from "tra-ma"

interface TransactionListProps {
  transactions: Transaction[]
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>{transaction.toString()}</li>
      ))}
    </ul>
  )
}
