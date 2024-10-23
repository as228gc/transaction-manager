import { ExpenseCategory, IncomeCategory, ReportGenerator, Transaction, TransactionProcessor, TransactionType } from "tra-ma"
import { LocalStorageManager } from "../model/LocalStorageManager/LocalStorageManager";
import { useState } from "react";
import { TransactionForm } from "../views/TransactionForm/TransactionForm";
import { TransactionList } from "../views/TransactionList/TransactionList";
import { ReportView } from "../views/Report/ReportView";
import { TransactionData } from "../views/TransactionForm/TransactionData";

export function Controller() {
  const storageManager = new LocalStorageManager()
  const processor = new TransactionProcessor(storageManager.loadTransactions())
  const generator = new ReportGenerator(processor)
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
    const transaction = new Transaction(
      new Date(transactionData.date),
      transactionData.amount,
      TransactionType.EXPENSE,
      transactionData.category as ExpenseCategory
    )

    processor.appendTransaction(transaction)
    storageManager.storeTransaction(transaction)
  }

  function handleCreateIncomeTransaction(transactionData: TransactionData): void {
    const transaction = new Transaction(
      new Date(transactionData.date),
      transactionData.amount,
      TransactionType.INCOME,
      transactionData.category as IncomeCategory
    )

    processor.appendTransaction(transaction)
    storageManager.storeTransaction(transaction)
  }

  // function handleTransactionFormSubmit() {

  // }

  // function handleDisplayTransactions(): void {

  // }

  // function handleCreateReport(): void {
  //   if (processor.getTransactions().length == 0) {
  //     return
  //   }
  // }

  return (
    <>
      <button onClick={handleShowExpenseForm}>Create new expense transaction</button>
      <button onClick={handleShowIncomeForm}>Create new income transaction</button>
      <button onClick={handleShowTransactions}>Display all transactions</button>
      <button onClick={handleShowReport}>Create report</button>
      <div>
        {showExpenseForm && (
          <TransactionForm handleSubmit={handleCreateExpenseTransaction} type={TransactionType.EXPENSE} categories={expenseCategories} />
        )}

        {showIncomeForm && (
          <TransactionForm handleSubmit={handleCreateIncomeTransaction} type={TransactionType.INCOME} categories={incomeCategories} />
        )}

        {showTransactions && (
          <TransactionList transactions={processor.getTransactions()}/>
        )}

        {showReport && (
          <ReportView report={generator.generateReport()}/>
        )}

      </div>
    </>
  )
}