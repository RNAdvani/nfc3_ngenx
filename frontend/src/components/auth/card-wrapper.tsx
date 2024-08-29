"use client"

import { CardContent,Card,CardFooter,CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps{
    children :React.ReactNode;
    HeaderLabel :string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial ?:boolean;
}

export const CardWrapper = ({HeaderLabel,backButtonHref,backButtonLabel,children,showSocial}:CardWrapperProps)=>{
    return <Card  className="w-[400px] shadow-md">
        <CardHeader >
            <Header label={HeaderLabel} />
        </CardHeader>
        <CardContent >
            {children}
        </CardContent>
        {
            showSocial && (
                <CardFooter >
                    <Social />
                </CardFooter>
            )
        }
        <CardFooter >
            <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
    </Card>
    
}