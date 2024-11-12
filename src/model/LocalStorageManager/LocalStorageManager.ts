import { ExpenseCategory, ExpenseTransaction, IncomeCategory, IncomeTransaction, Transaction, TransactionType } from "tra-ma";

export class LocalStorageManager {
  private storage: Storage;
  private transactionIds: Array<string>;
  private idStorage: string;

  constructor() {
    this.storage = localStorage;
    this.idStorage = "transactionIds";
    this.transactionIds = this.loadTransactionIds();
  }

  public storeTransaction(transaction: Transaction) {
    const transactionJson = {
      amount: transaction.getAmount(),
      type: this.determineType(transaction),
      category: transaction.getCategory(),
      date: transaction.getDate(),
    };

    // Store the transaction JSON in localStorage
    this.storage.setItem(transaction.getId(), JSON.stringify(transactionJson));

    // Update the stored Ids
    this.storeTransactionId(transaction.getId());
  }

  private determineType (transaction: string | Transaction): TransactionType {
    if (typeof transaction === "string") {
      return transaction === TransactionType.EXPENSE ? TransactionType.EXPENSE : TransactionType.INCOME
    }
    return transaction instanceof ExpenseTransaction ? TransactionType.EXPENSE : TransactionType.INCOME
  }

  public loadTransactions(): Array<Transaction> {
    const transactions = new Array<Transaction>();
    this.transactionIds.forEach((id) => {
      const transactionString = this.storage.getItem(id);
      if (transactionString === null) {
        return; // Skip if the transaction does not exist
      }

      const transactionJson = JSON.parse(transactionString);

      if (this.determineType(transactionJson.type) === TransactionType.EXPENSE) {
        transactions.push(this.createExpenseTransaction(transactionJson, id))
      } else {
        transactions.push(this.createIncomeTransaction(transactionJson, id))
      }
    })
    return transactions;
  }

  private createExpenseTransaction(transactionJson: any, id: string ): ExpenseTransaction {
    return new ExpenseTransaction(
      new Date(transactionJson.date),
      parseInt(transactionJson.amount),
      id,
      transactionJson.category as ExpenseCategory
    )
  }

  private createIncomeTransaction(transactionJson: any, id: string ): IncomeTransaction {
    return new IncomeTransaction(
      new Date(transactionJson.date),
      parseInt(transactionJson.amount),
      id,
      transactionJson.category as IncomeCategory
    )
  }

  private getItem(id: string): string | null {
    return this.storage.getItem(id);
  }

  private loadTransactionIds(): Array<string> {
    const storedIds = this.getItem(this.idStorage);
    if (!storedIds) {
      return [];
    }

    try {
      return JSON.parse(storedIds) as Array<string>;
    } catch {
      return [];
    }
  }

  private storeTransactionId(id: string) {
    this.transactionIds.push(id);
    this.storage.setItem(this.idStorage, JSON.stringify(this.transactionIds));
  }

  public deleteTransaction(id: string) {
    const idIndex = this.transactionIds.findIndex((transactionId) => transactionId === id)
    this.transactionIds.splice(idIndex, 1)
    this.storage.setItem(this.idStorage, JSON.stringify(this.transactionIds));

    if (this.transactionIds.length === 0) {
      this.storage.removeItem(this.idStorage)
    }

    localStorage.removeItem(id)
  }
}
