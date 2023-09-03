"use client";
import LoadingIcon from "@/components/icons/LoadingIcon";
import GroLogo from "@/components/icons/Logo";
import { Input } from "@/components/ui/input";
import { supabaseValueExists } from "@/lib/helpers";
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

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
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
      const emailExists = await isEmailAlreadyExists(
        "profiles",
        "email",
        email,
      );

      if (emailExists) {
        setLoginError("Account already exists");
        return;
      }
      await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
          },
        },
      });
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
    return await supabaseValueExists(table, column, value, supabase);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !user) {
        setLoading(false);
        setLoginError("Invalid Login Credentials");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      profile && storeUserDetails(profile);
      profile && profile.type && redirectToDashboard(profile.type);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const storeUserDetails = (user: User) => {
    if (typeof window !== "undefined" && user && user.type) {
      localStorage.setItem("role", user.type);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const redirectToDashboard = (userRole: string | null) => {
    const targetPath = userRole === "admin" ? "/app/" : "/app/plans";
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
