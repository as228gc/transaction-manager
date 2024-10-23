import React from "react"
import { Transaction } from "tra-ma"
import { TransactionInfo } from "../TransactionInfo/TransactionInfo"

interface TransactionListProps {
  transactions: Transaction[]
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <ul>
      {transactions.map((transaction) => (
        <TransactionInfo transaction={transaction}/>
      ))}
    </ul>
  )
}
