import React from 'react'
import './App.css'
import { IncomeForm } from './views/TransactionForm/IncomeForm/IncomeForm'


class App extends React.Component {

  render(): JSX.Element {
    return (
      <>
        <h1>Transaction Manager</h1>
        <IncomeForm categories={ ['income1', 'income2', 'income3', 'income4'] }></IncomeForm>
      </>
    )
  }
}

export default App
