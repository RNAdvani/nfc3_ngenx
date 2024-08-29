"use server"
import * as z from "zod"
import bcrypt from 'bcryptjs'
import { getUserByEmail } from "@/data/user";
import { LoginSchema, RegisterSchema } from "@/utils";
import connect from "@/lib/db";
import User from "@/models/user.model";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";



export const register = async (values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values);

    
    if(!validatedFields.success){
        return {error:"Invalid fields"}
    }
    
    const {email,name,password} = validatedFields.data

    const existingUser = await getUserByEmail(email);

    if(existingUser) return {error:"Email already in use"}

    const hashedPassword = await bcrypt.hash(password,10);

   await connect();

    try {
        await User.create({
            email,
            name,
            password:hashedPassword
       });
        await signIn("credentials",{
            email,password,redirectTo: process.env.DEFAULT_REDIRECT_PATH
        })
        return {success:"Logged in"}

    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Invalid Credentials"};
                default :
                    return {error:"Something went wrong"};
            }
        }
        throw error;
    }
}





export const login = async (values:z.infer<typeof LoginSchema>)=>{
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"}
    }

    const {email,password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error :"Invalid Credentials"}
    }

  

    try {
        await signIn("credentials",{
            email,password,redirectTo: process.env.DEFAULT_REDIRECT_PATH
        })
        return {success:"Logged in"}

    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error:"Invalid Credentials"};
                default :
                    return {error:"Something went wrong"};
            }
        }
        throw error;
    }
}