import { ExpenseTransaction, Transaction, TransactionType } from "tra-ma";
import './TransactionInfo.css'

interface TransactionInfoProps {
  transaction: Transaction
}

export const TransactionInfo: React.FC<TransactionInfoProps> = ({ transaction }) => {

  function determineType() {
    if (transaction instanceof ExpenseTransaction) {
      return TransactionType.EXPENSE
    }
    return TransactionType.INCOME
  }

  return (
    <div className="card">
      <p><strong>Date:</strong> {transaction.getDate().toString()}</p>
      <p><strong>Type:</strong> {determineType()}</p>
      <p><strong>Category:</strong> {transaction.getCategory()}</p>
      <p><strong>Amount:</strong> {transaction.getAmount()}</p>
    </div>
  )
}