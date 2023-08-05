"use client";
import LoadingIcon from "@/components/icons/LoadingIcon";
import GroLogo from "@/components/icons/Logo";
import { supabaseValueExists } from "@/lib/helpers";
import { Database } from "@/lib/types/supabase";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginViews =
  | "sign-in"
  | "sign-up"
  | "check-email"
  | "forgot-password"
  | "no-account";

type LoginErrors =
  | "No account"
  | "Invalid Login Credentials"
  | "Please enter password"
  | "Please enter email"
  | "Account already exists"
  | "Failed to sign up, please try again."
  | "An unexpected error occurred, please try again."
  | null;

type RoleType = {
  user_type: {
    name: string;
  };
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<LoginErrors>(null);
  const [view, setView] = useState<LoginViews>("sign-in");
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emailExists = await isEmailAlreadyExists("user", "email", email);

      if (emailExists) {
        setLoginError("Account already exists");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setLoginError("Failed to sign up, please try again.");
        return;
      }

      setView("check-email");
    } catch (error) {
      console.error(error);
      setLoginError("An unexpected error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isEmailAlreadyExists = async (
    table: string,
    column: string,
    value: string,
  ) => {
    // Implementation for checking if the email exists in the database
    return await supabaseValueExists(table, column, value);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError || !signInData?.user) {
        setLoading(false);
        setLoginError("Invalid Login Credentials");
        return;
      }

      // const role = (await getUserRole(
      //   signInData.user.email?.toLowerCase() as string,
      //   supabase,
      // )) as unknown as RoleType;

      // storeUserDetails(role, signInData.user);
      // redirectToDashboard(role.user_type.name);
      router.push("/dashboard/plans");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const storeUserDetails = (role: RoleType, user: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("role", role.user_type.name);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const redirectToDashboard = (userRole: string) => {
    const targetPath =
      userRole === "admin" ? "/dashboard/" : "/dashboard/plans";
    router.push(targetPath);
    router.refresh();
  };

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
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        view === "sign-in" ? "bg-gray-100" : "bg-indigo-200",
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
