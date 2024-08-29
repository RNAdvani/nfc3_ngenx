import React from 'react'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage, } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { ExpenseSchema } from '@/utils'



const ExpenseForm = () => {

    const form = useForm<z.infer<typeof ExpenseSchema>>({
        resolver: zodResolver(ExpenseSchema),
        defaultValues:{
            date:"",
            amount:0,
            description:"",
            category:""
        }
    });

  return (
    <div>

    </div>
  )
}

export default ExpenseForm