import Image from "next/image";
import google from "@/assets/images/google.png";
import { cn } from "@/app/utills/helper/global-helper";

export default function GoogleButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-4 rounded-md border py-4 font-semibold text-black/70",
        className
      )}
    >
      <Image className="size-5" src={google} alt="google" />
      <span>Continue with Google</span>
    </button>
  );
}
