import { auth } from '@/auth'
import LogoutButton from '@/components/auth/logout-button'
import Stock from '@/components/Stock'
import React from 'react'

const Home = async() => {
  const session =  await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <LogoutButton />
      <Stock />
    </div>
  )
}

export default Home