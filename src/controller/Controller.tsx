import { ExpenseCategory, IncomeCategory, TransactionProcessor, ExpenseTransaction, IncomeTransaction, TransactionType, ReportGenerator } from "tra-ma"
import { LocalStorageManager } from "../model/LocalStorageManager/LocalStorageManager";
import { useState } from "react";
import { TransactionForm } from "../views/TransactionForm/TransactionForm";
import { TransactionList } from "../views/TransactionList/TransactionList";
import { ReportView } from "../views/Report/ReportView";
import { TransactionData } from "../views/TransactionForm/TransactionData";
import "./controller.css"
import { IdGenerator } from "../model/IdGenerator/IdGenerator";

export function Controller() {
  const idGenerator = new IdGenerator()
  const storageManager = new LocalStorageManager()
  const processor = new TransactionProcessor(storageManager.loadTransactions())
  const reportGenerator = new ReportGenerator(processor)
  const expenseCategories = Object.values(ExpenseCategory)
  const incomeCategories = Object.values(IncomeCategory)

  enum View {
    EXPENSE_FORM,
    INCOME_FORM,
    TRANSACTION_LIST,
    REPORT
  }

  const [currentView, setCurrentView] = useState(View.EXPENSE_FORM)

  function handleCreateExpenseTransaction(transactionData: TransactionData): void {
    try {
      const transaction = new ExpenseTransaction(
        new Date(transactionData.date),
        transactionData.amount,
        idGenerator.generateTransactionId(),
        transactionData.category as ExpenseCategory
      )

      processor.appendTransaction(transaction)
      storageManager.storeTransaction(transaction)
      console.log(processor.getTransactions())
    } catch (error) {
      console.log("Could not create transaction")
    }
  }

  function handleCreateIncomeTransaction(transactionData: TransactionData): void {
    try {
      const transaction = new IncomeTransaction(
        new Date(transactionData.date),
        transactionData.amount,
        idGenerator.generateTransactionId(),
        transactionData.category as IncomeCategory
      )

      processor.appendTransaction(transaction)
      storageManager.storeTransaction(transaction)
    } catch (error) {
      console.log("Could not create transaction")
    }
  }

  /**
   * Handles the request to delete a transaction
   *
   * @param id The id of the transaction to delete 
   */
  function handleDeleteTransaction(id: string) {
    processor.deleteById(id)
    storageManager.deleteTransaction(id)
  }

  return (
    <>
      <div className="button-container">
        <button onClick={() => setCurrentView(View.EXPENSE_FORM)}>Create new expense transaction</button>
        <button onClick={() => setCurrentView(View.INCOME_FORM)}>Create new income transaction</button>
        <button onClick={() => setCurrentView(View.TRANSACTION_LIST)}>Display all transactions</button>
        <button onClick={() => setCurrentView(View.REPORT)}>Create report</button>
      </div>
      <div>
        {currentView === View.EXPENSE_FORM && (
          <TransactionForm handleSubmit={handleCreateExpenseTransaction} type={TransactionType.EXPENSE} categories={expenseCategories} />
        )}

        {currentView === View.INCOME_FORM && (
          <TransactionForm handleSubmit={handleCreateIncomeTransaction} type={TransactionType.INCOME} categories={incomeCategories} />
        )}

        {currentView === View.TRANSACTION_LIST && processor.getNumberOfTransactions() > 0 && (
          <TransactionList onDelete={handleDeleteTransaction} transactions={processor.getTransactions()} />
        )}

        {currentView === View.REPORT && processor.getNumberOfTransactions() > 0 && (
          <ReportView report={reportGenerator.generateReport()} />
        )}

      </div>
    </>
  )
}