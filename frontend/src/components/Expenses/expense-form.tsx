import React from 'react'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage, } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { ExpenseSchema } from '@/utils'
import { Textarea } from '../ui/textarea'



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

    const onSubmit =(values: z.infer<typeof ExpenseSchema>)=>{
        console.log(values)
     }

  return (
    <div>
         <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className="space-y-4">
                    <FormField control={form.control} name='date' render={({field})=>(
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='john.doe@example.com' type='email' /> 
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='amount' render={({field})=>(
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='1000' type='number' /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='category' render={({field})=>(
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Food' type='password' /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='description' render={({field})=>(
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea  {...field} placeholder='Spent on a hooker?' className='resize-none' /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Form>

    </div>
  )
}

export default ExpenseForm