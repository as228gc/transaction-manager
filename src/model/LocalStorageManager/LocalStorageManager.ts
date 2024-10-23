import { ExpenseCategory, IncomeCategory, Transaction, TransactionType } from "tra-ma";

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
      type: transaction.getType(),
      category: transaction.getCategory(),
      date: transaction.getDate(),
    };

    const transactionKey: string = this.generateTransactionKey();

    // Store the transaction JSON in localStorage
    this.storage.setItem(transactionKey, JSON.stringify(transactionJson));

    // Update the stored keys
    this.storeTransactionKey(transactionKey);
  }

  public loadTransactions(): Array<Transaction> {
    const transactions = new Array<Transaction>();
    this.transactionKeys.forEach((key) => {
      const transactionString = this.storage.getItem(key);
      if (transactionString === null) {
        return; // Skip if the transaction does not exist
      }

      const transactionJson = JSON.parse(transactionString);

      transactions.push(
        new Transaction(
          new Date(transactionJson.date),
          transactionJson.amount,
          transactionJson.type as TransactionType,
          transactionJson.category as IncomeCategory | ExpenseCategory
        )
      );
    });
    return transactions;
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
