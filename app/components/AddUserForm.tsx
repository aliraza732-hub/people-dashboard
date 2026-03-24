"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user.");
      }

      setName("");
      setEmail("");
      router.refresh();
    } catch {
      setError("Could not add the user. Please check the values and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Add new user
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Create a user profile to start tracking their posts.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/70"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/70"
          required
        />

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl cursor-pointer bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add user"}
        </button>
      </form>
    </section>
  );
}