"use client";

import { Dispatch, SetStateAction, type ReactElement } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type Props = {
    children: ReactElement;
    buttonText: string;
    className?: string;
    isOpen: boolean
    onOpenChange: Dispatch<SetStateAction<boolean>>
};

export default function Modal({ children, buttonText, className, isOpen, onOpenChange }: Props) {
    return (
        <>
            <Button onClick={() => onOpenChange(true)}>{buttonText}</Button>

            {isOpen ? (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-auto">
                        <Button
                            onClick={() => onOpenChange(false)}
                            className="absolute top-2 right-2 p-1"
                            variant="ghost"
                        >
                            <X className="h-8 w-8 hover:bg-red-200 p-1 rounded-full text-gray-500 transition-colors" />
                        </Button>
                        <div className={className}>
                            {children}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
