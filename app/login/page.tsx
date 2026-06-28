'use client'

import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import { toast } from "react-hot-toast";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const getFirebaseErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'The email or password is incorrect.';
      default:
        return error.message;
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    }

    return nextErrors;
  };

  const handleLogIn = async () => {
    if (isLoading) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success('Login successful.');
      router.push('/dashboard');
    } catch (error) {
      const message = error instanceof FirebaseError
        ? getFirebaseErrorMessage(error)
        : 'An unexpected error occurred while logging in.';

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <section className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-lg p-8">
          {/* Top Decorative Circles */}
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full border-7 border-neutral-100" />
          <div className="absolute top-8 -right-24 h-60 w-60 rounded-full border-7 border-neutral-100" />

          <div className="relative z-10">
            {/* Welcome Text */}
            <h2 className="text-5xl font-bold text-neutral-900 leading-tight">
              Welcome
              <br />
              Back
            </h2>

            <p className="mt-3 text-sm text-neutral-500">
              Hey! Good to see you again.
            </p>

            {/* Form UI */}
            <div className="mt-8 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full rounded-2xl border px-5 py-4 outline-none transition ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-neutral-900'}`}
                  value={email}
                  onChange={handleEmail}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full rounded-2xl border px-5 py-4 outline-none transition ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-neutral-900'}`}
                  value={password}
                  onChange={handlePassword}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            {/* Forgot Password */}
            <div className="mt-3 text-right">
              <button
                className="text-sm text-neutral-500 hover:text-neutral-900 cursor-pointer transition"
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
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                  onClick={handleLogIn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'LOGIN'}
                </button>

                <p className="mt-5 text-sm text-neutral-600">
                  Don&apos;t have an account?{" "}
                  <span className="font-semibold underline cursor-pointer">
                    <Link href='/signup'>
                      Sign Up
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Circles */}
          <div className="absolute -bottom-10 -left-24 h-60 w-60 rounded-full border-7 border-neutral-100" />
        </section>
      </div>
    </main>
  );
}