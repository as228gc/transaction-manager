import React, { useState } from "react"
import { TransactionFormProps } from "./TransactionFormProps"
import { TransactionData } from "./TransactionData"
import "./TransactionForm.css"

export const TransactionForm: React.FC<TransactionFormProps> = ({ handleSubmit, categories, type }) => {
  
  const transactionData: TransactionData = {
    amount: 0,
    category: categories[0],
    date: String(new Date())
  }

  const [formData, setFormData] = useState<TransactionData>(transactionData)

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFormData({
      ...formData,
      category: event.target.value
    })
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      amount: parseInt(event.target.value)
    })
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      date: event.target.value
    })
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleSubmit(formData)
  }

  return (
    <form onSubmit={handleFormSubmit}>

      <div className="transaction-input">
        <label htmlFor="transaction-category">Enter category of {type}</label>
        <select name="transaction-category" id="transaction-category" onChange={handleCategoryChange}>
          {
            categories.map((category) => {
              return <option value={category}>{category}</option>
            })
          }
        </select>
      </div>

      <div className="transaction-input">
        <label htmlFor="transaction-amount">Enter amount of credits</label>
        <input type="number" name="transaction-amount" id="transaction-amount" onChange={handleAmountChange} />
      </div>

      <div className="transaction-input">
        <label htmlFor="">Enter the date of the transaction</label>
        <input type="date" name="transaction-date" id="transaction-date" onChange={handleDateChange} />
      </div>

      <button id="submit-button" type="submit">Create</button>
    </form>
  )
}