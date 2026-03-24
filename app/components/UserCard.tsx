"use client";

import { useRouter } from "next/navigation";

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
    posts: { id: number }[];
  };
}

export default function UserCard({ user }: Props) {
  const router = useRouter();

  async function handleDelete() {
    await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {user.name}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {user.email}
          </p>
          <p className="mt-3 inline-flex rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            Posts: {user.posts.length}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="rounded-lg cursor-pointer border border-red-300 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900/40"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
