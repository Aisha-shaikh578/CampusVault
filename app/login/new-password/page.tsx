"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import logo from '../../../images/logo.png';
import { CgCheck } from "react-icons/cg";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setSuccess(true);
      setEmail("");
    } catch (error: any) {
      toast.error("Failed to send password reset link");

      if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account was found with this email address.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many requests. Please wait a while and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-(--surface) flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
          <div className="flex justify-center">
          <Image className="h-30 w-20" src={logo} alt='logo'/>
          </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-(--secondary)">
            Forgot Password
          </h1>

          <p className="mt-3 text-sm text-(--muted) leading-6">
            Enter your email address and we&apos;ll send you
            a link to reset your password.
          </p>
        </div>

        {/* Back to login */}
        <div className="flex justify-center mb-7">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          >
            <span className="text-lg">←</span>
            Back to Login
          </Link>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-xl border border-(--border) bg-(--surface-variant) px-4 py-4">
            <div className="flex gap-3">
              <div className="mt-0.5">
                <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white text-xs">
                    <CgCheck size={24}/>
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-(--secondary)">
                  Reset link sent
                </p>

                <p className="mt-1 text-sm text-(--muted)">
                  Check your inbox for the password reset
                  link. Don&apos;t forget to check your spam folder.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-(--muted) mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
                className="w-full h-12 rounded-xl border-2 border-(--border) focus:border-(--border) px-4 text-sm outline-none transition-all placeholder:(--placeholder) disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-(--primary) text-white text-sm font-semibold transition-all hover:bg-(--primary-hover) cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        {/* Success action */}
        {success && (
          <div className="space-y-3">
            <Link
              href="/login"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-(--primary) text-sm font-semibold text-white transition-all hover:bg-(--primary-hover)"
            >
              Back to Login
            </Link>

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setError("");
              }}
              className="w-full text-sm font-medium text-(--text-primary) cursor-pointer hover:text-(--text-secondary) transition-all">
              Try another email
            </button>
          </div>
        )}

        {/* Google information */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-center text-xs leading-5 text-gray-400">
            If you signed up using Google, you can continue
            signing in with your Google account instead of
            resetting a Campus Vault password.
          </p>
        </div>
      </div>
    </main>
  );
}