"use client"
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage, } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { LoginSchema } from '@/utils'
import { login } from '@/actions/user'


export const LoginForm = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending,startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    });

    const onSubmit =(values: z.infer<typeof LoginSchema>)=>{
       startTransition(()=>{
        setError("");
        setSuccess("");

        login(values).then((data)=>{
            if(data){
                data.error && setError(data.error);
                data?.success && setSuccess(data?.success);
            }
        })
       })
    }

  return (
    <CardWrapper HeaderLabel='Welcome back' backButtonLabel='Dont have an account?' backButtonHref='/auth/register' showSocial >
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className="space-y-4">
                    <FormField control={form.control} name='email' render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='john.doe@example.com' type='email' /> 
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='password' render={({field})=>(
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
                        className='w-full px-4'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Form>
    </CardWrapper>
  )
}

