"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FiStar } from "react-icons/fi";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";
import { FadeIn } from "@/context/motionContext";
import { db } from "@/lib/firebase";
import SignupPage from "@/app/signup/page";

const MAX_FEEDBACK_LENGTH = 500;

export default function FeedbackPage() {
const { user } = useAuth();
const [rating, setRating] = useState(0);
const [message, setMessage] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
event.preventDefault();
const trimmedMessage = message.trim();

if (!rating) {
  setErrorMessage("Please select a rating before submitting.");
  return;
}

if (!trimmedMessage) {
  setErrorMessage("Please share your feedback before submitting.");
  return;
}

setErrorMessage("");
setIsSubmitting(true);

try {
  await addDoc(collection(db, "feedback"), {
    userId: user?.uid,
    email: user?.email,
    rating,
    message: trimmedMessage,
    createdAt: serverTimestamp(),
  });

  setMessage("");
  setRating(0);
  setIsSubmitted(true);
} catch (error) {
  setErrorMessage(
    "Something went wrong while submitting your feedback. Please try again."
  );
} finally {
  setIsSubmitting(false);
}
};

if (!user) {
return <SignupPage />;
}

return (
<div className="flex min-h-screen bg-(--background) text-(--text-primary)">
<Sidebar />

  <div className="flex flex-1 flex-col">
    <Header searchTerm="" onSearchChange={() => undefined} />

    <main className="ml-20 mt-16 flex-1 p-4 sm:p-16 lg:ml-60 lg:p-8">
      <FadeIn>
        <div className="mx-auto max-w-2xl">
          {isSubmitted ? (
            <div className="rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm sm:p-8">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                Thank you for your feedback!
              </h1>
              <span className="italic mt-2">Feedback submitted successfully</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm sm:p-8"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  We&apos;d love to hear from you!
                </h1>

                <p className="mt-3 text-sm text-(--text-secondary) sm:text-base">
                  Your feedback helps us make <span className="font-bold">Campus Vault</span> better for everyone.
                </p>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-sm font-medium">
                  How would you rate your experience?
                </p>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="rounded-full cursor-pointer p-0.5 md:p-1.5 text-2xl focus:outline-none"
                      >
                        <FiStar
                          className={`h-6 w-6 ${
                            star <= rating ? "text-yellow-500 fill-yellow-500" : "text-(--muted)"
                          }`}
                        />
                      </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="feedback-message"
                  className="mb-2 block text-sm font-medium"
                >
                  Your feedback
                </label>

                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value.slice(0, MAX_FEEDBACK_LENGTH)
                    )
                  }
                  placeholder="Share your thoughts, suggestions, or ideas with us..."
                  rows={5}
                  maxLength={MAX_FEEDBACK_LENGTH}
                  className="w-full resize-none rounded-xl border border-(--border) bg-(--surface-variant) px-3 py-3 text-sm text-(--text-primary) placeholder:text-(--placeholder) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
                />

                <p className="mt-1 text-right text-xs text-(--text-secondary)">
                  {message.length}/{MAX_FEEDBACK_LENGTH}
                </p>
              </div>

              {errorMessage && (
                <p
                  className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-(--primary) cursor-pointer px-4 py-2.5 text-sm font-medium text-(--on-primary) transition hover:bg-(--primary-hover) outline-none disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </FadeIn>
    </main>
  </div>
</div>
);
}