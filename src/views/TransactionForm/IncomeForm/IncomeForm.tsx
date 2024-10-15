import React from "react"
import { TransactionFormProps } from "../TransactionFormProps"

export class IncomeForm extends React.Component<TransactionFormProps> {
  #categories: Array<string>

  constructor(props: TransactionFormProps) {
    super(props)
    this.#categories = this.props.categories
  }

  render(): JSX.Element {
    return (
      <form className="d-flex flex-column align-start">

        <label htmlFor="transaction-category">Enter category of income</label>
        <select name="transaction-category" id="transaction-category">
          {
            this.#categories.map((category) => {
              return <option value={category} key={category}>{category}</option>
            })
          }
        </select>

        <label htmlFor="transaction-amount">Enter amount of credits</label>
        <input type="number" name="transaction-amount" id="transaction-amount" />

        <label htmlFor="">Enter the date of the transaction</label>
        <input type="date" name="transaction-date" id="transaction-date" />

        <button type="submit">Create</button>
      </form>
    )
  }
}