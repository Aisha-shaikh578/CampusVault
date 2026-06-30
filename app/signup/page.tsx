'use client'

import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState, type ChangeEvent } from "react";
import { toast } from "react-hot-toast";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  };

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
    setErrors((prev) => ({ ...prev, terms: undefined }));
  };

  const getFirebaseErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'Please enter a valid email.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
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

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeToTerms) {
      nextErrors.terms = 'Please agree to the Terms & Services.';
    }

    return nextErrors;
  };

  const signUpUser = async () => {
    if (isLoading) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email.trim(), password);
      toast.success('Account created successfully.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAgreeToTerms(false);
    } catch (error) {
      const message = error instanceof FirebaseError
        ? getFirebaseErrorMessage(error)
        : 'An unexpected error occurred while creating your account.';

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-(--background) flex items-center justify-center px-4 py-10'>
      <div className="w-full max-w-md">
        <section className="relative overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-lg p-8">
          {/* Decorative Circles Top */}
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full border-6 border-(--border)" />
          <div className="absolute top-8 -right-24 h-60 w-60 rounded-full border-6 border-(--border)" />

          <div className='relative z-10'>
            {/* Title */}
            <h2 className="text-5xl font-bold text-(--text-primary)">
              Sign Up
            </h2>

            <p className="mt-2 xl:mt-3 text-sm text-(--text-secondary)">
              Create an account to continue
            </p>

            {/* Form UI */}
            <div className="mt-8 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                  className={`w-full rounded-2xl border px-5 py-4 outline-none transition ${errors.email ? 'border-(--danger) focus:border-(--danger)' : 'border-(--border) focus:border-black'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                  className={`w-full rounded-2xl border px-5 py-4 outline-none transition ${errors.password ? 'border-(--danger) focus:border-(--danger)' : 'border-(--border) focus:border-black'}`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  className={`w-full rounded-2xl border px-5 py-4 outline-none transition ${errors.confirmPassword ? 'border-(--danger) focus:border-(--danger)' : 'border-(--border) focus:border-black'}`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-center gap-3 text-sm text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={handleTermsChange}
                    className="h-4 w-4 cursor-pointer"
                  />

                  <span className="text-(--text-secondary)">
                    I agree with{" "}
                    <span className="underline font-medium cursor-pointer">
                      Terms & Services
                    </span>
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
              </div>
            </div>

            {/* Bottom Curved Area */}
            <div className="relative mt-10">
              <div className="relative flex flex-col items-center">
                <button
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-(--border)
                    bg-(--surface)
                    text-(--text-secondary)
                    py-4
                    text-lg
                    font-semibold
                    hover:bg-(--surface-variant)
                    transition
                    cursor-pointer
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                  onClick={signUpUser}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'SIGN UP'}
                </button>

                <p className="mt-5 text-sm text-(--text-secondary)">
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
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full border-6 border-(--border)" />
        </section>
      </div>
    </main>
  );
}
