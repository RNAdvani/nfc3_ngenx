"use client";
import React from 'react'
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage, } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { ExpenseSchema } from '@/utils'
import { Textarea } from '../ui/textarea'
import { DatePickerDemo } from '../ui/date-picker'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '../ui/calendar'




const ExpenseForm = () => {

    const form = useForm<z.infer<typeof ExpenseSchema>>({
        resolver: zodResolver(ExpenseSchema),
        defaultValues:{
            date:new Date(),
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
                <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"default"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && ""
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto bg-background text-darkgreen h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
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
                            </FormControl>
                                <Input {...field} placeholder='Food' type="text" /> 
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='description' render={({field})=>(
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea  {...field} placeholder='Describe...' className='resize-none h-[10rem]' /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button
                        type='submit'
                        className='w-full bg-darkgreen text-black'
                    >
                        Add Expense
                    </Button>
                </div>
            </form>
        </Form>

    </div>
  )
}

export default ExpenseForm
