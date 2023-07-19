"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingIcon from "@/components/icons/LoadingIcon";
import GroLogo from "@/components/icons/Logo";
import { supabaseValueExists } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type LoginViews =
  | "sign-in"
  | "sign-up"
  | "check-email"
  | "forgot-password"
  | "no-account";

type LoginErrors =
  | "No account"
  | "Incorrect password"
  | "Please enter password"
  | "Please enter email"
  | null;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<LoginErrors>(null);
  const [view, setView] = useState<LoginViews>("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);

  const createUser = async (email: string) => {
    const { data, error } = await supabase.from("user").insert([{ email }]);
    if (error) {
      throw error;
    }

    return data;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    if (!(await supabaseValueExists("user", "email", email))) {
      setLoading(false);
      console.log("no account");
      setLoginError("No account");
      return;
    }

    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  };

  useEffect(() => {}, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8 bg-gray-100 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gro-pink w-40 rounded-lg mx-auto">
          <GroLogo />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 max-w-[480px] md:min-w-[480px] sm:mx-auto px-10 py-8 bg-white shadow md:rounded-lg">
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
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
              <div className="pt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="••••••••"
                    autoComplete="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
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
