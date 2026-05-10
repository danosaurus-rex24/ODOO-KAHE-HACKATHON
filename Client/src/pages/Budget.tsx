import React from 'react'
import Card from '../components/Card'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface BudgetItem {
  id: number
  category: string
  amount: number
  type: 'expense' | 'income'
  icon: string
}

const Budget: React.FC = () => {
  const budgetItems: BudgetItem[] = [
    { id: 1, category: 'Flights', amount: 1200, type: 'expense', icon: '✈️' },
    { id: 2, category: 'Hotels', amount: 900, type: 'expense', icon: '🏨' },
    { id: 3, category: 'Food & Dining', amount: 450, type: 'expense', icon: '🍽️' },
    { id: 4, category: 'Activities', amount: 300, type: 'expense', icon: '🎭' },
    { id: 5, category: 'Transport', amount: 200, type: 'expense', icon: '🚕' },
    { id: 6, category: 'Savings from trip', amount: 500, type: 'income', icon: '💰' },
  ]

  const totalExpenses = budgetItems
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)

  const totalIncome = budgetItems
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-red-500">${totalExpenses}</p>
            </div>
            <TrendingDown size={40} className="text-red-500 opacity-20" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Income</p>
              <p className="text-3xl font-bold text-green-500">${totalIncome}</p>
            </div>
            <TrendingUp size={40} className="text-green-500 opacity-20" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Net Balance</p>
              <p className="text-3xl font-bold text-primary dark:text-accent">
                ${totalIncome - totalExpenses}
              </p>
            </div>
            <DollarSign size={40} className="text-accent opacity-20" />
          </div>
        </Card>
      </div>

      {/* Budget Breakdown */}
      <Card>
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
          Budget Breakdown
        </h2>

        <div className="space-y-3">
          {budgetItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-primary border border-light dark:border-secondary"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-primary dark:text-white">
                    {item.category}
                  </p>
                </div>
              </div>
              <span
                className={`text-lg font-bold ${
                  item.type === 'expense'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {item.type === 'expense' ? '-' : '+'}${item.amount}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
          Spending by Category
        </h2>
        <div className="space-y-4">
          {budgetItems
            .filter((item) => item.type === 'expense')
            .map((item) => (
              <div key={item.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.category}
                  </span>
                  <span className="font-semibold text-primary dark:text-white">
                    {Math.round((item.amount / totalExpenses) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-light dark:bg-secondary rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(item.amount / totalExpenses) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  )
}

export default Budget