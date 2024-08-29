import React from 'react'
import { Header } from './header'
import { BackButton } from './back-button'
import { Card,CardFooter,CardHeader } from '@/components/ui/card'

const ErrorCardComponent = () => {
  return (
    <Card className='w-[400px] shadow-md' >
        <CardHeader>
            <Header label='Oops! Something Went Wrong!' />
        </CardHeader>
        <CardFooter >
            <BackButton href='/auth/login' label='Back to Login' />
        </CardFooter>
    </Card>
  )
}

export default ErrorCardComponent