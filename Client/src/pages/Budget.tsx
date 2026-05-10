import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { supabase } from '../supabaseClient'

interface BudgetItem {
  id: number
  category: string
  amount: number
  type: 'expense' | 'income'
  icon: string
}

interface ExpenseRow {
  id?: number | string
  category?: string
  amount?: number | string | null
  type?: 'expense' | 'income' | null
}

const mockBudgetItems: BudgetItem[] = [
  { id: 1, category: 'Flights', amount: 1200, type: 'expense', icon: '✈️' },
  { id: 2, category: 'Hotels', amount: 900, type: 'expense', icon: '🏨' },
  { id: 3, category: 'Food & Dining', amount: 450, type: 'expense', icon: '🍽️' },
  { id: 4, category: 'Activities', amount: 300, type: 'expense', icon: '🎭' },
  { id: 5, category: 'Transport', amount: 200, type: 'expense', icon: '🚕' },
  { id: 6, category: 'Savings from trip', amount: 500, type: 'income', icon: '💰' },
]

const toNumber = (value: number | string | null | undefined) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const mapExpenseRow = (row: ExpenseRow, index: number): BudgetItem => ({
  id: Number(row.id) || index + 1,
  category: row.category || 'Uncategorized',
  amount: toNumber(row.amount),
  type: row.type || 'expense',
  icon: row.type === 'income' ? '💰' : '🍽️',
})

const Budget: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<any[]>([]);

  const fetchExpensesAndIncome = async () => {
    setIsLoading(true);
    try {
      // Fetch expenses
      const { data: expensesData, error: expensesError } = await supabase.from('expenses').select('*');
      if (expensesError) {
        setBudgetItems(mockBudgetItems);
        setExpenses([]);
      } else {
        setExpenses(expensesData || []);
        const nextItems = (expensesData || []).map((item, index) => mapExpenseRow(item, index));
        setBudgetItems(nextItems);
      }
      // Fetch trips for income
      const { data: tripsData, error: tripsError } = await supabase.from('trips').select('*');
      if (!tripsError && Array.isArray(tripsData) && tripsData.length > 0) {
        // Sum all trip incomes (if multiple trips)
        const totalIncome = tripsData.reduce((sum, trip) => sum + (Number(trip?.income) || 0), 0);
        setIncome(totalIncome);
      } else {
        setIncome(0);
      }
    } catch (error) {
      setBudgetItems(mockBudgetItems);
      setIncome(0);
      setExpenses([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddExpense = () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    alert(`₹${amount} added to expenses`);
    setAmount("");
  }

  useEffect(() => {
    fetchExpensesAndIncome();
  }, []);

  // Calculate total expenses from expenses array (from Supabase)
  const totalExpenses = Array.isArray(expenses)
    ? expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
    : 0;

  // Use income from trips
  const totalIncome = income;

  // Calculate remaining budget
  const remainingBudget = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Budget Summary Section */}
      <div className="bg-secondary p-4 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-semibold">Total Budget: ₹{totalIncome}</p>
        <p className="font-semibold">Spent: ₹{totalExpenses}</p>
        <p className={"font-semibold " + (remainingBudget < 0 ? "text-red-500" : "")}>Remaining: ₹{remainingBudget}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-red-500">₹{totalExpenses}</p>
            </div>
            <TrendingDown size={40} className="text-red-500 opacity-20" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Budget</p>
              <p className="text-3xl font-bold text-green-500">₹{totalIncome}</p>
            </div>
            <TrendingUp size={40} className="text-green-500 opacity-20" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Net Balance</p>
              <p className={"text-3xl font-bold " + (remainingBudget < 0 ? "text-red-500" : "text-primary dark:text-accent")}>₹{remainingBudget}</p>
            </div>
            <DollarSign size={40} className="text-accent opacity-20" />
          </div>
        </Card>
      </div>

      {/* Budget Breakdown */}
      <Card>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-primary dark:text-white">
            Budget Breakdown
          </h2>
          <div className="flex gap-2 items-center mt-2 md:mt-0">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="px-3 py-2 rounded-lg border border-light dark:border-secondary bg-gray-50 dark:bg-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent w-32"
            />
            <Button onClick={handleAddExpense}>
              Add Expense
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading expenses...</p>
          ) : (
            budgetItems.map((item) => (
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
            ))
          )}
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
                    {totalExpenses > 0 ? Math.round((item.amount / totalExpenses) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-light dark:bg-secondary rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0}%`,
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
