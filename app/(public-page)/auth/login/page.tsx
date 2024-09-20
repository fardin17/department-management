import Link from "next/link";
import LoginForm from "@/app/components/auth/login-form";
import AuthCarousel from "@/app/components/carousel";
import GoogleButton from "@/app/components/google-button";

export default function SignInPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-slate-200 px-2 xl:px-0">
      <div className="my-14 grid w-full max-w-[90rem] grid-cols-1 overflow-hidden rounded-3xl bg-transparent shadow-md lg:h-[90dvh] lg:grid-cols-2">
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-white px-2 py-16 pb-20 xl:px-0">
          <LoginForm />

          <div className="mx-auto flex w-full max-w-md items-center justify-center gap-4">
            <div className="h-0.5 w-full bg-black/50"></div>
            <div className="text-black/60">or</div>
            <div className="h-0.5 w-full bg-black/50"></div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <GoogleButton className="w-full" />
          </div>

          <p className="absolute bottom-[3%] left-[50%] -translate-x-[50%] text-xs font-semibold text-black/70 lg:bottom-[2%]">
            Don&apos;t have an account?{" "}
            <Link href={"/auth/sign-up"} className="text-sm font-bold text-indigo-600">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center bg-indigo-950 py-20">
          <AuthCarousel />
        </div>
      </div>
    </main>
  );
}
