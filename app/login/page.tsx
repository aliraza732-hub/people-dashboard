import Image from "next/image";
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-50 to-indigo-50 p-6 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium tracking-wide text-indigo-600 dark:text-indigo-300">
            People Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Sign in with your Google account to continue.
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="flex cursor-pointer w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              width={20}
              height={20}
              alt="Google"
            />
            Sign in with Google
          </button>
        </form>
      </div>
    </main>
  );
}