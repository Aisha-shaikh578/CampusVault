export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <section className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-lg p-8">
          {/* Top Decorative Circles */}
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full border-8 border-neutral-100" />
          <div className="absolute top-8 -right-24 h-60 w-60 rounded-full border-8 border-neutral-100" />

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
                "
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
                "
              />
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
                  "
                >
                  LOGIN
                </button>

                <p className="mt-5 text-sm text-neutral-600">
                  Don&apos;t have an account?{" "}
                  <span className="font-semibold underline cursor-pointer">
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottonm Decorative Circles */}
          <div className="absolute -bottom-10 -left-24 h-60 w-60 rounded-full border-8 border-neutral-100" />
        </section>
      </div>
    </main>
  );
}