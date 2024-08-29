import { DialogHandle } from "@/types";
import React from "react";



export const useDialog = (ref: React.RefObject<DialogHandle>)=>{
    const handleOpenDialog = () => {
        if(ref.current){
            ref.current.open();
        }
    }
    const handleCloseDialog = () => {
        if(ref.current){
            ref.current.close();
        }
    }
    return [handleOpenDialog, handleCloseDialog];
}