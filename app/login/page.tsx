'use client'

import { FadeIn } from "@/context/motionContext";
import { auth, db } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { CiLock, CiMail } from "react-icons/ci";
import googleLogo from '../../images/google.png';
import { doc, getDoc } from "firebase/firestore";
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

    const signInWithGoogle = async() => {
      if (isLoading) return;
      setIsLoading(true);
  
      try {
       const googleProvider = new GoogleAuthProvider();
       const result = await signInWithPopup(auth, googleProvider);
       const user = result.user;
       const userRef = doc(db, 'users', user.uid);
       const userSnapshot = await getDoc(userRef);

       if(userSnapshot.exists()) {
        toast.success('Account created successfully.');
        router.push('/dashboard');
        return;
       }
       await signOut(auth);
       toast.error('No account found. Please sign up first.');
       router.push('/signup');
      } catch (error) {
        const message = error instanceof FirebaseError
          ? getFirebaseErrorMessage(error)
          : 'An unexpected error occurred while creating your account.';
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }

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
    <main className="min-h-screen bg-(--background) flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <FadeIn>
        <section className="relative overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-lg p-8">
          {/* Top Decorative Circles */}
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full border-7 border-(--border)" />
          <div className="absolute top-8 -right-24 h-60 w-60 rounded-full border-7 border-(--border)" />

          <div className="relative z-10">
            {/* Welcome Text */}
            <h2 className="text-5xl font-bold text-(--text-primary) leading-tight">
              Welcome
              <br />
              Back
            </h2>

            <p className="mt-3 text-sm text-(--text-secondary)">
              Hey! Good to see you again.
            </p>

            {/* Form UI */}
            <div className="mt-8 space-y-4">
              <div className="relative">
                <div className="absolute bottom-3.5 mx-2">
                  <CiMail size={22}/>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full rounded-2xl border pl-9 pr-2 py-3 outline-none transition ${errors.email ? 'border-(--danger) focus:border-(--danger)' : 'border-(--border) focus:border-black'}`}
                  value={email}
                  onChange={handleEmail}
                />
                {errors.email && <p className="mt-1 text-sm text-(--danger)">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="absolute bottom-3.5 mx-2">
                  <CiLock size={22}/>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full rounded-2xl border pl-9 pr-2 py-3 outline-none transition ${errors.password ? 'border-(--danger) focus:border-(--danger)' : 'border-(--border) focus:border-black'}`}
                  value={password}
                  onChange={handlePassword}
                />
                {errors.password && <p className="mt-1 text-sm text-(--danger)">{errors.password}</p>}
              </div>
            </div>

            {/* Forgot Password */}
            <div className="mt-3 text-right">
              <button
                className="text-sm text-(--text-secondary) hover:text-(--text-primary) cursor-pointer transition"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative mt-6">
              <div className="relative flex flex-col items-center">
                <button
                  className="
                    w-full
                    rounded-2xl
                    bg-(--surface-variant)
                    text-(--text-secondary)
                    hover:bg-(--surface)
                    py-3
                    text-md
                    md:text-lg
                    font-semibold
                    hover:opacity-90
                    cursor-pointer
                    transition
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    border
                    border-(--border)
                  "
                  onClick={handleLogIn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'LOGIN'}
                </button>

              <div className="flex gap-2 items-center my-2">
                <div className="h-0.5 w-20 opacity-50 pt-1"><hr/></div>
                <div>or</div>
                <div className="h-0.5 w-20 opacity-50 pt-1"><hr/></div>
              </div>

               {/* Google Sign Up */}
                <button
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-(--border)
                    bg-(--surface)
                    text-(--text-secondary)
                    py-3
                    text-md
                    md:text-lg
                    font-semibold
                    hover:bg-(--surface-variant)
                    transition
                    cursor-pointer
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    flex
                    gap-0.5
                    md:gap-2
                    flex-row-reverse
                    justify-center
                    items-center
                  "
                  onClick={signInWithGoogle}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Continue with Google'}
                  <span>
                    <Image 
                    src={googleLogo} alt="Logo" height={35} width={35} 
                    className="rounded-full"/>
                  </span>
                </button>

                <p className="mt-5 text-sm text-(--text-secondary)">
                  Don&apos;t have an account?{" "}
                  <span className="font-semibold underline cursor-pointer">
                    <Link href='/signup' className="hover:text-(--text-primary) transition">
                      Sign Up
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Circles */}
          <div className="absolute -bottom-10 -left-24 h-60 w-60 rounded-full border-7 border-(--border)" />
        </section>
        </FadeIn>
      </div>
    </main>
  );
}