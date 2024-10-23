import React from 'react'
import './App.css'
import { Controller } from './controller/Controller'


class App extends React.Component {

  render(): JSX.Element {
    return (
      <>
        <h1>Transaction manager</h1>
       <Controller></Controller>
      </>
    )
  }
}

export default App
