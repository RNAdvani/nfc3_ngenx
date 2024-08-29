import ExpenseForm from '@/components/Expenses/expense-form'
import { ExpensesGraph } from '@/components/Expenses/Expenses'
import { MonthlyGraph } from '@/components/Expenses/Monthly'
import { SavingGraph } from '@/components/Expenses/Savings'
import React from 'react'

const ExpensePage = () => {
  return (
    <div>
      <ExpenseForm />
      <ExpensesGraph />
      <MonthlyGraph />
      <SavingGraph />
    </div>
  )
}

export default ExpensePage