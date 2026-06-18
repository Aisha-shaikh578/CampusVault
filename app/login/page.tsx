'use client'

import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredentials)
      router.push("/dashboard")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0f172a] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <section className="relative overflow-hidden rounded-4xl border border-neutral-200 dark:bg-[#0f172a] bg-white shadow-lg p-8">
          {/* Top Decorative Circles */}
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full border-7 border-neutral-100 dark:border-neutral-700" />
          <div className="absolute top-8 -right-24 h-60 w-60 rounded-full border-7 border-neutral-100 dark:border-neutral-700" />

          <div className="relative z-10">
            {/* Welcome Text */}
            <h2 className="text-5xl font-bold text-neutral-900 leading-tight dark:text-white">
              Welcome
              <br />
              Back
            </h2>

            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-300">
              Hey! Good to see you again.
            </p>

            {/* Form UI */}
            <div className="mt-8 space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="
                  w-full
                  rounded-2xl
                  bg-neutral-50
                  px-5
                  py-4
                  outline-none
                  border
                  border-transparent
                  focus:border-neutral-300
                  transition
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-white
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="
                  w-full
                  rounded-2xl
                  bg-neutral-50
                  px-5
                  py-4
                  outline-none
                  border
                  border-transparent
                  focus:border-neutral-300
                  transition
                  dark:bg-slate-800
                  dark:text-white
                  dark:placeholder:text-white
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password */}
            <div className="mt-3 text-right">
              <button
                className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-300 cursor-pointer transition"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative mt-12">
              <div className="relative flex flex-col items-center">
                <button
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    text-white
                    py-4
                    text-lg
                    font-semibold
                    hover:opacity-90
                    cursor-pointer
                    transition
                    dark:bg-white
                    dark:text-black
                  "
                  onClick={handleLogIn}
                >
                  LOGIN
                </button>

                <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-300">
                  Don&apos;t have an account?{" "}
                  <span className="font-semibold underline cursor-pointer dark:text-white">
                    <Link href='/signup'>
                     Sign Up
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Circles */}
          <div className="absolute -bottom-10 -left-24 h-60 w-60 rounded-full border-7 border-neutral-100 dark:border-neutral-700" />
        </section>
      </div>
    </main>
  );
}