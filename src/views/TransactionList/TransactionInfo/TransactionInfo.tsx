import { ExpenseTransaction, Transaction, TransactionType } from "tra-ma";
import './TransactionInfo.css'

interface TransactionInfoProps {
  transaction: Transaction,
  onDelete: (id: string) => void
}

export const TransactionInfo: React.FC<TransactionInfoProps> = ({ transaction, onDelete }) => {

  function determineType() {
    if (transaction instanceof ExpenseTransaction) {
      return TransactionType.EXPENSE
    }
    return TransactionType.INCOME
  }

  function handleDelete(id: string) {
    onDelete(id)
  }

  return (
    <div className="card">
      <div className="info-container">

        <p><strong>Date:</strong> {transaction.getDate().toString()}</p>
        <p><strong>Type:</strong> {determineType()}</p>
        <p><strong>Category:</strong> {transaction.getCategory()}</p>
        <p><strong>Amount:</strong> {transaction.getAmount()}</p>
      </div>
      <button id="delete-button" onClick={() => handleDelete(transaction.getId())}>Delete</button>
    </div>
  )
}