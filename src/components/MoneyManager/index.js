import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onDeleteTransactionList = id => {
    const {transactionList} = this.state
    const updatedtransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({transactionList: updatedtransactionList})
  }

  onAddButton = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onTextChange = event => {
    const {titleInput} = this.state
    this.setState({titleInput: event.target.value})
    console.log(titleInput)
  }

  onAmountChange = event => {
    const {amountInput} = this.state
    this.setState({amountInput: event.target.value})
    console.log(amountInput)
  }

  onOptionIdChange = event => {
    const {optionId} = this.state
    this.setState({optionId: event.target.value})
    console.log(optionId)
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const balanceAmount = this.getBalance()
    return (
      <div className="main-container">
        <div className="app-container">
          <h1 className="name">Hi, Richard</h1>
          <p className="para">
            Welocme back to your
            <span className="name-para">Money Manager</span>
          </p>
        </div>
        <div>
          <ul>
            <MoneyDetails
              income={incomeAmount}
              expenses={expensesAmount}
              balance={balanceAmount}
            />
          </ul>
        </div>
        <div className="transaction-history">
          <div>
            <form className="form" onSubmit={this.onAddButton}>
              <h1 className="form-heading">Add Transaction</h1>
              <div className="form-elements">
                <label htmlFor="text" className="labels">
                  TITLE
                </label>
                <input
                  type="text"
                  id="text"
                  placeholder="TITLE"
                  className="input-elements"
                  onChange={this.onTextChange}
                  value={titleInput}
                />
                <label htmlFor="amount" className="labels">
                  AMOUNT
                </label>
                <input
                  type="text"
                  id="amount"
                  placeholder="AMOUNT"
                  className="input-elements"
                  onChange={this.onAmountChange}
                  value={amountInput}
                />
                <label htmlFor="type" className="labels">
                  TYPE
                </label>
                <select
                  id="type"
                  className="input-elements"
                  onChange={this.onOptionIdChange}
                  value={optionId}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="history-container">
            <h1 className="history-name">History</h1>
            <ul className="ul">
              <li className="history-elements">
                <p>Title</p>
                <p>Amount</p>
                <p className="type">Type</p>
              </li>
              <li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.onDeleteTransactionList}
                  />
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
