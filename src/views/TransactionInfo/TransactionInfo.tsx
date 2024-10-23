import { Transaction } from "tra-ma";

export function TransactionInfo(transaction: Transaction) {
  return (
    <div className="card">
      <p>Date: {transaction.getDate().toString()}</p>
      <p>Type: {transaction.getType()}</p>
      <p>Category: {transaction.getCategory()}</p>
      <p>Amount: {transaction.getAmount()}</p>
    </div>
  )
}