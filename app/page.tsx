import prisma from "@/lib/prisma";
import AddUserForm from "./components/AddUserForm";
import UserCard from "./components/UserCard";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    include: { posts: true },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-right">
            <p className="text-sm font-medium tracking-wide text-indigo-600 dark:text-indigo-300">
              People Dashboard
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-100">
              Team users
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your users and review their post counts in one place.
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="text-right">
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {session.user?.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {session.user?.email}
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="rounded-lg cursor-pointer border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>

      <AddUserForm />

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Users
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {users.length} total
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}
