import * as z from "zod";
export const LoginSchema = z.object({
    email: z.string().email("Email is Required"),
    password: z.string().min(1,"Password is required")
})

export const RegisterSchema = z.object({
    email: z.string().email("Email is Required"),
    password: z.string().min(6,"Minimum 6 characters is required"),
    name: z.string().min(1,"Name is required")
})

export const ExpenseSchema = z.object({
    date : z.date(),
    amount : z.number(),
    description : z.string(),
    category : z.string()
})

export const SimulateSchema = z.object({
    amount : z.any(),
    fraction_of_amount : z.any(),
    loss_percentage : z.any(),
    profit_percentage : z.any()
})