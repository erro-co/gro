"use client";
import LoadingIcon from "@/components/icons/LoadingIcon";
import GroLogo from "@/components/icons/Logo";
import { Input } from "@/components/ui/input";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useLogin } from "./hooks/useLogin";

export default function Login() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    loginError,
    view,
    setView,
    loading,
    handleSignUp,
    handleSignIn,
  } = useLogin();

  if (view === "check-email") {
    return (
      <div
        className={clsx(
          "bg-indigo-200",
          "flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8 h-screen",
        )}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-gro-pink w-40 rounded-lg mx-auto">
            <GroLogo />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Please follow the instructions sent to your email address.
          </h2>
          <h3 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            (Check your spam or junk folder if you don&apos;t see the email)
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "bg-gray-100",
        "flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8 h-screen",
      )}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gro-pink w-40 rounded-lg mx-auto">
          <GroLogo />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {view === "sign-in" ? <p>Sign in to your account</p> : null}
          {view === "sign-up" ? <p>Create your account!</p> : null}
        </h2>
      </div>
      <div className="mt-4 max-w-[480px] md:min-w-[480px] sm:mx-auto px-10 py-8 bg-white shadow md:rounded-lg">
        <div>
          {loading ? (
            <div className="w-20 mx-auto">
              <LoadingIcon />
            </div>
          ) : (
            <form onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}>
              {loginError !== null ? (
                <div className="flex w-full">
                  <div className="mx-auto flex">
                    <div className="w-6 text-red-500">
                      <ExclamationCircleIcon />
                    </div>
                    <p className="text-red-500 text-sm pt-0.5 pl-1">
                      {loginError}
                    </p>
                  </div>
                </div>
              ) : null}

              {view === "sign-up" ? (
                <>
                  <div className="pt-4">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name
                    </label>
                    <Input
                      type="text"
                      name="first_name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      required
                    />
                  </div>
                  <div className="pt-4">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                    <Input
                      type="text"
                      name="last_name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      required
                    />
                  </div>
                  <div className="pt-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <Input
                      type="phone"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </div>
                </>
              ) : null}

              <div className="pt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <Input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="pt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>

                <Input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  autoComplete="password"
                  required
                />
              </div>

              {view === "sign-in" && (
                <>
                  <button className="bg-gro-indigo rounded px-4 py-2 text-white mb-6 w-full mt-4">
                    Sign In
                  </button>
                  <p className="text-sm text-center">
                    Don&apos;t have an account?
                    <button
                      className="ml-1 underline"
                      onClick={() => setView("sign-up")}
                    >
                      Sign Up Now
                    </button>
                  </p>
                </>
              )}
              {view === "sign-up" && (
                <>
                  <button className="bg-gro-purple rounded px-4 py-2 text-white mb-6 w-full mt-4">
                    Sign Up
                  </button>
                  <p className="text-sm text-center">
                    Already have an account?
                    <button
                      className="ml-1 underline"
                      onClick={() => setView("sign-in")}
                    >
                      Sign In Now
                    </button>
                  </p>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
