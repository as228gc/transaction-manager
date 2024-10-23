import { TransactionType } from "tra-ma"
import { TransactionData } from "./TransactionData.ts"

export interface TransactionFormProps {
  handleSubmit: (transactionData: TransactionData) => void
  categories: Array<string>
  type: TransactionType
}
