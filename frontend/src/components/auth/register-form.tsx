"use client"
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage, } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { RegisterSchema } from '@/utils'
import { register } from '@/actions/user'

const RegisterForm = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending,startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password:"",
            name:""
        }
    });

    const onSubmit =(values: z.infer<typeof RegisterSchema>)=>{
       startTransition(()=>{
        register(values)
       })
    }

  return (
    <CardWrapper HeaderLabel='Create an Account' backButtonLabel='Already have an account?' backButtonHref='/auth/login' showSocial >
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className="space-y-4 cur">
                    <FormField disabled={isPending} control={form.control} name='name' render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='John Doe' type='text' /> 
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )} />
                    <FormField disabled={isPending} control={form.control} name='email' render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='john.doe@example.com' type='email' /> 
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )} />
                    <FormField disabled={isPending} control={form.control} name='password' render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='*********' type='password' /> 
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )} />
                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isPending}
                    >
                        Register
                    </Button>
                </div>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm