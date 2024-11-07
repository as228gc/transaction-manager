import { TransactionType } from "tra-ma"
import { TransactionData } from "./TransactionData"

export interface TransactionFormProps {
  handleSubmit: (transactionData: TransactionData) => void
  categories: Array<string>
  type: TransactionType
}
