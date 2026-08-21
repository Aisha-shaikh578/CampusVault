"use client";

import { ChangeEvent } from "react";
import { FiAlertTriangle, FiCamera, FiMail, FiShield, FiUser } from "react-icons/fi";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SignupPage from "@/app/signup/page";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/lib/supabase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { redirect } from "next/navigation";
import ProfilePicture from "@/components/ProfilePicture";
import { toast } from "react-hot-toast";
import { FadeIn } from "@/context/motionContext";

export default function SettingsPage() {
  const { user, profilePic, setProfilePic } = useAuth();

  const deleteAccount = async () => {
    if(!user) return;

     const password = window.prompt('Please enter your password to confirm your account deletion');
     if(!password) return;

     try {
      const credential = EmailAuthProvider.credential(user.email!, password);
      await(reauthenticateWithCredential(user, credential));
      await deleteUser(user);
      toast.success('Account deleted successfully');
      redirect('/signup')
     } catch (error) {
      console.log(error)
     }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(!file || !user) return;

    try {
      const fileName = `profile-pictures/${user.uid}-${Date.now()}`;

        const { error } = await supabase.storage.from('Storage').upload(fileName, file, {
        upsert: true,
      })

      if(error) {
        throw error;
      }

      const { data } = supabase.storage.from('Storage').getPublicUrl(fileName);
      const profileImgUrl = data.publicUrl;

       await setDoc(
        doc(db, 'users', user.uid), {
          profileImgUrl
        }, {
          merge: true
        }
       );
       setProfilePic(profileImgUrl);
       toast.success('Profile picture updated');
    } catch (error) {
      console.log('Profile pic upload failed', error);
    }
  }

  return (
  <>
    {user ? (
      <div className="flex min-h-screen bg-(--background) text-(--text-primary)">
        <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header searchTerm="" onSearchChange={() => undefined} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-20 lg:ml-60 mt-16">
        <FadeIn>
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <section className="rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--primary)">
                Account
              </p>
              <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
              <p className="text-sm text-(--text-secondary)">
                Manage your profile and account preferences.
              </p>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--border) bg-(--surface-variant)">
                {profilePic ? (
                 <ProfilePicture />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-(--surface-variant)">
                  <FiUser className="h-12 w-12 text-(--text-secondary)" />
                </div>
              )}
            </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                  Add a profile picture to personalize your account. This preview is ready for future integration with your profile data.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 py-2 text-sm font-medium text-(--on-primary) transition hover:bg-(--primary-hover)">
                    <FiCamera className="h-4 w-4" />
                    <span>Upload Profile Picture</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <FiShield className="h-5 w-5 text-(--primary)" />
              <h2 className="text-lg font-semibold">Account Information</h2>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-(--border) bg-(--surface-variant) p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-secondary)">
                  Email
                </p>
                <p className="mt-1 text-sm text-(--text-primary)">
                  {user.email ?? "Sign in to view your account details."}
                </p>
              </div>

              <div className="rounded-xl border border-(--border) bg-(--surface-variant) p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-secondary)">
                  Account status
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-(--text-primary)">
                  <FiMail className="h-4 w-4 text-(--primary)" />
                  Active account
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FiAlertTriangle className="h-5 w-5 text-(--danger)" />
                <h2 className="text-lg font-semibold">Delete Account</h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-(--text-secondary)">
                Are you sure you want to delete your <b>Campus Vault</b> account?
              </p>
            </div>

              <button
                type="button"
                onClick={() => deleteAccount()}
                className="inline-flex items-center justify-center rounded-lg bg-(--danger) cursor-pointer px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Delete Account
              </button>
            </div>
          </section>
         </div>
         </FadeIn>
        </main>
      </div>
      </div>
    ) : (
      <SignupPage />
    )}
  </>
  );
}
