import { Transaction } from "tra-ma";

export class LocalStorageManager {
  private storage: Storage
  private idCounter: number
  private transactionKeys: Array<string>

  constructor() {
    this.storage = localStorage
    this.idCounter = 0;
    this.transactionKeys = new Array<string>()
  }

  public storeTransaction(transaction: Transaction) {
    this.storage.setItem(this.generateTransactionKey(), JSON.stringify(transaction))
  }

  public loadTransactions(): Array<Transaction> {
    const transactions = new Array<Transaction>()
    this.transactionKeys.forEach((key) => {
      const transactionString = this.storage.getItem(key)
      if (transactionString === null) {
        return
      }
      transactions.push(JSON.parse(transactionString) as Transaction)
    })
    return transactions
  }

  private generateTransactionKey(): string {
    const currentDate = new Date();
    const key = `transaction-${currentDate}-${this.idCounter}`
    this.transactionKeys.push(key)
    this.idCounter++
    return key
  }
}