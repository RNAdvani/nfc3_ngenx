import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogHandle } from "@/types";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useImperativeHandle, useRef ,forwardRef, useState} from 'react'


interface CustomDialogProps {
children: React.ReactNode;
preventDefault?:boolean
}
  
  
  const CustomDialog = forwardRef<DialogHandle, CustomDialogProps>((props, ref) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => ({
      open: () => {
        if (triggerRef.current) {
          triggerRef.current.click();
        }
      },
      close: () => {
        if (closeRef.current) {
          closeRef.current.click();
        }
      },
    }));
  
    return (
      <Dialog  >
        <DialogTrigger className="relative "  asChild>
          <button ref={triggerRef} style={{ display: 'none' }}>Trigger</button>
        </DialogTrigger>
        <DialogContent onEscapeKeyDown={props.preventDefault ?(e)=>e.preventDefault() :()=>{}}  className="w-full p-0  bg-white ">
          {props.children}
          <DialogClose asChild className="absolute top-1 right-1 hidden" >
          <button ref={closeRef}>X</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  });
  
  export default CustomDialog;