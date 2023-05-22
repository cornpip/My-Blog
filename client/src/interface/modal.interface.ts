import { Dispatch, SetStateAction } from "react";

export interface BasicModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    yesHandler: (args: any) => {};
    noHandler: (args: any) => {};
}

export interface InfoModalProps {
    info_title: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    closeHandler: () => void;
    info_sub?: string;
}