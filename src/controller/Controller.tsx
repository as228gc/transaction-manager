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

  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)

  function handleShowExpenseForm() {
    setShowReport(false)
    setShowTransactions(false)
    setShowIncomeForm(false)
    setShowExpenseForm(true)
  }

  function handleShowIncomeForm() {
    setShowReport(false)
    setShowTransactions(false)
    setShowExpenseForm(false)
    setShowIncomeForm(true)
  }

  function handleShowTransactions() {
    setShowReport(false)
    setShowExpenseForm(false)
    setShowIncomeForm(false)
    setShowTransactions(true)
  }

  function handleShowReport() {
    setShowExpenseForm(false)
    setShowIncomeForm(false)
    setShowTransactions(false)
    setShowReport(true)
  }

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
        <button onClick={handleShowExpenseForm}>Create new expense transaction</button>
        <button onClick={handleShowIncomeForm}>Create new income transaction</button>
        <button onClick={handleShowTransactions}>Display all transactions</button>
        <button onClick={handleShowReport}>Create report</button>
      </div>
      <div>
        {showExpenseForm && (
          <TransactionForm handleSubmit={handleCreateExpenseTransaction} type={TransactionType.EXPENSE} categories={expenseCategories} />
        )}

        {showIncomeForm && (
          <TransactionForm handleSubmit={handleCreateIncomeTransaction} type={TransactionType.INCOME} categories={incomeCategories} />
        )}

        {showTransactions && (
          <TransactionList onDelete={handleDeleteTransaction} transactions={processor.getTransactions()} />
        )}

        {showReport && (
          <ReportView report={reportGenerator.generateReport()} />
        )}

      </div>
    </>
  )
}