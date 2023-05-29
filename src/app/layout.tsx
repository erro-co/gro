"use client";

import "./globals.css";
import SignIn from "@/components/SignIn";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  }, []);

  if (!isLoggedIn) {
    return (
      <html>
        <body>
          <SignIn />
        </body>
      </html>
    );
  }

  return (
    <html>
      <head>
        <title>Gro Nutrition</title>
        <link rel="icon" href="/gro_logo.png" />
      </head>
      <body>{children}</body>;
    </html>
  );
}
