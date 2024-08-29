"use client"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"

export const Social= ()=>{

    const handleSignIn = (provider:"google") =>{
        signIn(provider,{
            callbackUrl :process.env.DEFAULT_REDIRECT_PATH
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button   className="w-full flex gap-2" variant={"outline"} onClick={()=>handleSignIn("google")}>
                <FcGoogle className="h-5 w-5" /> Sign In with Google
            </Button>
        </div>
    )
}