"use client";
import "./globals.css";
import { FC, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GroLogo from "@/components/icons/Logo";
import LoadingIcon from "@/components/icons/LoadingIcon";
import Link from "next/link";

export interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  const [sessionState, setSessionState] = useState<any>({});
  const [email, setEmail] = useState<string>("");
  const [succefullySubmitted, setSuccefullySubmitted] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      console.log("session", session);
      setSessionState(session.data.session);
      if (session.data.session === null) {
        setSuccefullySubmitted(false);
      }
    })();
  }, []);

  const handlelogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/dashboard"
            : "https://gro-app.vercel.app/dashboard",
      },
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log("data", data);
    setLoading(false);
    setSuccefullySubmitted(true);
  };

  if (sessionState === null) {
    return (
      <html lang="en" className="bg-blue-100">
        <body>
          {succefullySubmitted ? (
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gro-pink w-40 rounded-lg mx-auto">
                  <GroLogo />
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Please check your email to login!
                </h2>
              </div>
            </div>
          ) : (
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gro-pink w-40 rounded-lg mx-auto">
                  <GroLogo />
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                  {loading ? (
                    <div className="w-20 mx-auto">
                      <LoadingIcon />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        onClick={handlelogin}
                        className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>

                      <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link
                          href="https://www.instagram.com/gronutrition/"
                          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                          Get in contact with the team!
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
