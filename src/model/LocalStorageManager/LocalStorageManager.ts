import { ExpenseCategory, ExpenseTransaction, IncomeCategory, IncomeTransaction, Transaction, TransactionType } from "tra-ma";

export class LocalStorageManager {
  private storage: Storage;
  private idCounter: number;
  private transactionKeys: Array<string>;
  private keyStorage: string;

  constructor() {
    this.storage = localStorage;
    this.idCounter = 0;
    this.keyStorage = "transactionKeys";
    this.transactionKeys = this.loadTransactionKeys();
  }

  public storeTransaction(transaction: Transaction) {
    const transactionJson = {
      amount: transaction.getAmount(),
      type: this.determineType(transaction),
      category: transaction.getCategory(),
      date: transaction.getDate(),
    };

    const transactionKey: string = this.generateTransactionKey();

    // Store the transaction JSON in localStorage
    this.storage.setItem(transactionKey, JSON.stringify(transactionJson));

    // Update the stored keys
    this.storeTransactionKey(transactionKey);
  }

  private determineType (transaction: Transaction) {
    if (transaction instanceof ExpenseTransaction) {
      return TransactionType.EXPENSE
    }
    return TransactionType.INCOME
  }

  public loadTransactions(): Array<Transaction> {
    const transactions = new Array<Transaction>();
    this.transactionKeys.forEach((key) => {
      const transactionString = this.storage.getItem(key);
      if (transactionString === null) {
        return; // Skip if the transaction does not exist
      }

      const transactionJson = JSON.parse(transactionString);

      if (this.determineType(transactionJson.type) === TransactionType.EXPENSE) {
        transactions.push(this.createExpenseTransaction(
          transactionJson.date,
          transactionJson.amount,
          transactionJson.category
        ))
      } else {
        transactions.push(this.createIncomeTransaction(
          transactionJson.date,
          transactionJson.amount,
          transactionJson.category
        ))
      }
    })
    return transactions;
  }

  private createIncomeTransaction (date: string, amount: number, category: IncomeCategory) {
    return new IncomeTransaction(
      new Date(date),
      amount,
      category
    )
  }

  private createExpenseTransaction (date: string, amount: number, category: ExpenseCategory) {
    return new ExpenseTransaction(
      new Date(date),
      amount,
      category
    )
  }

  private getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  private loadTransactionKeys(): Array<string> {
    const storedKeys = this.getItem(this.keyStorage);
    if (!storedKeys) {
      return []; // Return an empty array if no keys are found
    }

    try {
      return JSON.parse(storedKeys) as Array<string>;
    } catch {
      return []; // Return an empty array if parsing fails
    }
  }

  private storeTransactionKey(key: string) {
    this.transactionKeys.push(key);
    this.storage.setItem(this.keyStorage, JSON.stringify(this.transactionKeys));
  }

  private generateTransactionKey(): string {
    const currentDate = new Date().toISOString();
    const key = `transaction-${currentDate}-${this.idCounter}`;
    this.idCounter++;
    return key;
  }
}
