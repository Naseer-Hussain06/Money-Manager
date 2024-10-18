// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {income, expenses, balance} = props
  return (
    <li className="list-item">
      <div className="balance-container amount-containers">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="images"
        />
        <div className="rupees">
          <p className="font-color-in-amount-container">Your balance</p>
          <p className="amount" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </div>

      <div className="income-container amount-containers">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="images"
        />
        <div className="rupees">
          <p className="font-color-in-amount-container">Your Income</p>
          <p className="amount" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>

      <div className="expenses-container amount-containers">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="images"
        />
        <div className="rupees">
          <p className="font-color-in-amount-container">Your Expenses</p>
          <p className="amount" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </li>
  )
}

export default MoneyDetails
