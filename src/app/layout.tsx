"use client";

import "./globals.css";
import SignIn from "@/components/SignIn";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import LoadingIcon from "@/components/icons/LoadingIcon";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = await supabase.auth.getUser();
    console.log("user", user);
    if (user.data.user?.aud === "authenticated") {
      console.log("user is logged in");
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("event", event);
        console.log("session", session);
        if (event === "SIGNED_IN") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!isLoggedIn) {
    return (
      <html>
        <body>
          <SignIn setLoggedIn={setIsLoggedIn} />
        </body>
      </html>
    );
  }

  if (isLoading) {
    return (
      <html>
        <body>
          <LoadingIcon className="w-40" />
        </body>
      </html>
    );
  }

  return (
    <html>
      <body>{children}</body>;
    </html>
  );
}
