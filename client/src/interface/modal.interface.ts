import { Dispatch, SetStateAction } from "react";

export interface BasicModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    yesHandler: (args: any)=>{};
    noHandler: (args: any)=>{};
}