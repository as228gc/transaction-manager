import { Transaction } from "tra-ma";

interface TransactionInfoProps {
  transaction: Transaction
}

export const TransactionInfo: React.FC<TransactionInfoProps> = ({ transaction }) => {
  return (
    <div className="card">
      <p>Date: {transaction.getDate().toString()}</p>
      <p>Type: {transaction.getType()}</p>
      <p>Category: {transaction.getCategory()}</p>
      <p>Amount: {transaction.getAmount()}</p>
    </div>
  )
}