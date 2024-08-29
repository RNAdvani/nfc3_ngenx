"use server"
import { signIn, signOut } from "@/auth";

export const SignOut = async ()=>{
    await signOut();
}