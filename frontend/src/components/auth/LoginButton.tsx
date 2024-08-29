"use client"
import { useRouter } from "next/navigation";



interface LoginButtonProps{
    children : React.ReactNode;
    modal?: "modal" | "redirect";
    asChild?: boolean
}

export const LoginButton = ({children,asChild,modal="modal"}:LoginButtonProps)=>{

    const router = useRouter();

    const onClick = ()=>{
        router.push("/auth/login")
    }

    return <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
}