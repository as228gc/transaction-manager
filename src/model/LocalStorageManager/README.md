# LocalStorageManager
The LocalStorageManager class is used to manage transactions in localStorage. It allows storing, loading, and deleting transactions from the localStorage. This class supports both income and expense transactions from the tra-ma package.

Example
```ts
import { LocalStorageManager } from "./path/to/LocalStorageManager";
import { ExpenseTransaction, IncomeTransaction } from "tra-ma";

// Initialize the manager
const storageManager = new LocalStorageManager();

// Create and store a transaction
const expenseTransaction = new ExpenseTransaction(new Date(), 50, "id_123", ExpenseCategory.FOOD);
storageManager.storeTransaction(expenseTransaction);

// Load all transactions
const transactions = storageManager.loadTransactions();

// Delete a transaction
storageManager.deleteTransaction("id_123");
```

## Public interface 

### storeTransaction
Takes a transaction instance and stores it in the localStorage.

Example:
```ts
const transaction = new ExpenseTransaction(new Date(), 50, "id_123", ExpenseCategory.FOOD)
const storageManager = new LocalStorageManager()
storageManager.storeTransaction(transaction)
```

### loadTransactions
Gathers all transactions stored in the localStorage and returns the transactions instances in an array.

Example:
```ts
const storageManager = new LocalStorageManager()
const transactions = storageManager.loadTRansactions()
```

### deleteTransaction
Deletes a transaction from the localStorage by taking an argument of an id and match it with the local storage item with the correct id.

Example
```ts
const storageManager = new LocalStorageManager()
const transaction = new ExpenseTransaction(new Date(), 50, "id_123", ExpenseCategory.FOOD)
storageManager.storeTransaction(transaction)

// Delete transaction
storageManager.deleteTransaction(transaction.getId())
```

