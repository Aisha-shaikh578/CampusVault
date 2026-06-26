'use client'

import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const signUpUser = async() => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);
    } catch (err) {
      if(err instanceof FirebaseError) {
        console.log(err.message);
      }
    }
  };

  return (
    <main className='min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-10'>
      <div className="w-full max-w-md">
        <section className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-lg p-8">
          {/* Decorative Circles Top */}
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full border-6 border-neutral-100" />
          <div className="absolute top-8 -right-24 h-60 w-60 rounded-full border-6 border-neutral-100" />

          <div className='relative z-10'>
            {/* Title */}
            <h2 className="text-5xl font-bold text-neutral-900">
              Sign Up
            </h2>

            <p className="mt-2 xl:mt-3 text-sm text-neutral-500">
              Create an account to continue
            </p>

            {/* Form UI */}
            <div className="mt-8 space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                className="w-full rounded-2xl border border-neutral-300 px-5 py-4 outline-none focus:border-neutral-900 transition"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                className="w-full rounded-2xl border border-neutral-300 px-5 py-4 outline-none focus:border-neutral-900 transition"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-2xl border border-neutral-300 px-5 py-4 outline-none focus:border-neutral-900 transition"
              />

              {/* Terms */}
              <label className="flex items-center gap-3 text-sm text-neutral-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                />

                <span>
                  I agree with{" "}
                  <span className="underline font-medium cursor-pointer">
                    Terms & Services
                  </span>
                </span>
              </label>
            </div>

            {/* Bottom Curved Area */}
            <div className="relative mt-10">
              <div className="relative flex flex-col items-center">
                <button
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-neutral-300
                    bg-white
                    py-4
                    text-lg
                    font-semibold
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                  "
                  onClick={signUpUser}
                >
                  SIGN UP
                </button>

                <p className="mt-5 text-sm text-neutral-600">
                  Already have an account?{" "}
                  <span className="font-semibold underline cursor-pointer">
                    <Link href='/login'>
                      Login
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* Decorative Circles Bottom*/}
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full border-6 border-neutral-100" />
        </section>
      </div>
    </main>
  );
}
