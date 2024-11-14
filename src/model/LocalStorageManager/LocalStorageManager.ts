import { ExpenseCategory, ExpenseTransaction, IncomeCategory, IncomeTransaction, Transaction, TransactionType } from "tra-ma";

/**
 * The LocalStorageManager class is responsible for storing and gathering transactions from the localStorage.
 */
export class LocalStorageManager {
  private storage: Storage;
  private transactionIds: Array<string>;
  private idStorage: string;

  /**
   * Creates a new instance of the LocalStorageManager.
   */
  constructor() {
    this.storage = localStorage;
    this.idStorage = "transactionIds";
    this.transactionIds = this.loadTransactionIds();
  }

  /**
   * Takes a transaction instance and stores it in the localStorage.
   *
   * @param transaction A transaction instance
   */
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

  /**
   * Determines the type of a transaction.
   *
   * @param transaction The transaction to determine the type of
   * @returns The type of the transaction
   */
  private determineType (transaction: string | Transaction): TransactionType {
    if (typeof transaction === "string") {
      return transaction === TransactionType.EXPENSE ? TransactionType.EXPENSE : TransactionType.INCOME
    }
    return transaction instanceof ExpenseTransaction ? TransactionType.EXPENSE : TransactionType.INCOME
  }

  /**
   * Gathers all transactions stored in the localStorage.
   *
   * @returns An array of transactions
   */
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

  /**
   * Creates an ExpenseTransaction instance from a JSON object.
   *
   * @param transactionJson A JSON object representing an ExpenseTransaction
   * @param id The id of the transaction
   * @returns An ExpenseTransaction instance
   */
  private createExpenseTransaction(transactionJson: any, id: string ): ExpenseTransaction {
    return new ExpenseTransaction(
      new Date(transactionJson.date),
      parseInt(transactionJson.amount),
      id,
      transactionJson.category as ExpenseCategory
    )
  }

  /**
   * Creates an IncomeTransaction instance from a JSON object.
   *
   * @param transactionJson A JSON object representing an IncomeTransaction
   * @param id The id of the transaction
   * @returns An IncomeTransaction instance
   */
  private createIncomeTransaction(transactionJson: any, id: string ): IncomeTransaction {
    return new IncomeTransaction(
      new Date(transactionJson.date),
      parseInt(transactionJson.amount),
      id,
      transactionJson.category as IncomeCategory
    )
  }

  /**
   * Gets an item from the localStorage.
   *
   * @param id The id of the item to get
   * @returns The item with the matching id
   */
  private getItem(id: string): string | null {
    return this.storage.getItem(id);
  }

  /**
   * Loads transaction ids from the localStorage.
   *
   * @returns An array of transaction ids
   */
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

  /**
   * Stores a transaction id in the localStorage.
   *
   * @param id The id of the transaction to store
   */
  private storeTransactionId(id: string) {
    this.transactionIds.push(id);
    this.storage.setItem(this.idStorage, JSON.stringify(this.transactionIds));
  }

  /**
   * Deletes a transaction from the localStorage.
   *
   * @param id The id of the transaction to delete
   */
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
