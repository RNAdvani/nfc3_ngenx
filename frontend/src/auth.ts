import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./utils";
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from "bcryptjs";
import connect from "./lib/db";
import User from "./models/user.model";
import { UserRole } from "./types";
import Google from "next-auth/providers/google";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    session : {strategy:"jwt"},
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if(validatedFields.success){
                const {email,password} = validatedFields.data;
                const user = await getUserByEmail(email);

                if(!user  || !user.password) return null

                const passwordMatch = await bcrypt.compare(password,user.password);


                if(passwordMatch) return user;
            }

            return null 
        }
    }),
  ],
  events: {
        async linkAccount({user}) {
            await connect();
            await User.create({
                email:user.email,
                name:user.name,
            })
        },
    },
  callbacks: {
    async signIn({account,user}){
        await connect();
        console.log({account,user})
        const userDoc = await getUserByEmail(user?.email!);
        if(!userDoc){
            await User.create({
                email:user?.email,
                name:user?.name,
            })
        }
        return true
      },
      async session({token,session}){
        if(token.sub && session.user){
          session.user.id = token.sub
        }
  
        if(token.sub && session.user){
          session.user.role = token.role  as UserRole;
        }
  
  
        return session
      },
      async jwt({token}){
  
        const existingUser = await getUserByEmail(token?.email as string);
  
        if(!existingUser) return token;
  
        token.sub = existingUser._id;
        token.role = existingUser.role
  
        return token
      }
    },
  secret: process.env.AUTH_SECRET,
})