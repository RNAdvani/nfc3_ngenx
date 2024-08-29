"use client"
import { SignOut } from '@/actions/auth'
import React from 'react'


const LogoutButton = () => {
  return (
    <div>
        <button onClick={()=>SignOut()}>Logout</button>
    </div>
  )
}

export default LogoutButton