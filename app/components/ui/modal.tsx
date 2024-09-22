"use client";

import { type ReactElement } from "react";
import { X } from "lucide-react";
import { Button } from "./button";

type Props = {
  children: ReactElement;
  buttonText?: string;
  className?: string;
  isOpen: boolean;
  showButton: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({
  children,
  buttonText,
  className,
  isOpen,
  showButton,
  onOpenChange,
}: Props) {
  return (
    <>
      {showButton ? (
        <Button
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold"
          onClick={() => onOpenChange(true)}
        >
          {buttonText ?? "Open Modal"}
        </Button>
      ) : null}

      {isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-auto">
            <Button
              onClick={() => onOpenChange(false)}
              className="absolute top-2 right-2 p-0"
            >
              <X className="h-8 w-8 bg-gray-200 text-gray-600 hover:text-rose-700 hover:bg-rose-100 hover:rotate-90 transition-all rounded-full p-1" />
            </Button>
            <div className={className}>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
