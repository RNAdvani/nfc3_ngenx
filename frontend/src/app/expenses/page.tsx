<<<<<<< Updated upstream
"use client";
import CustomDialog from '@/components/CustomDialog';
=======
import { DataTableDemo } from '@/components/Expenses/Datatable'
>>>>>>> Stashed changes
import ExpenseForm from '@/components/Expenses/expense-form'
import { ExpensesGraph } from '@/components/Expenses/Expenses'
import { MonthlyGraph } from '@/components/Expenses/Monthly'
import { SavingGraph } from '@/components/Expenses/Savings'
import { useDialog } from '@/hooks/useDialog'
import { DialogHandle } from '@/types'
import React from 'react'
import { Button } from '@/components/ui/button';

const ExpensePage = () => {

  const dialogRef = React.useRef<DialogHandle>(null);

  const [handleOpenDialog,handleCloseDialog] = useDialog(dialogRef);


  return (
<<<<<<< Updated upstream
    <div className='w-full p-6 flex flex-col gap-2'>
      <div className="flex justify-end w-full">
        <Button onClick={handleOpenDialog} className='bg-darkgreen'>Add expense</Button>
      </div>
=======
    <div>
      <ExpenseForm />
      <DataTableDemo />
>>>>>>> Stashed changes
      <ExpensesGraph />
      <MonthlyGraph />
      <SavingGraph />

      <CustomDialog ref={dialogRef}>
        <div className='bg-background rounded-lg p-6'>
        <ExpenseForm />
        </div>
      </CustomDialog>

    </div>
  )
}

export default ExpensePage