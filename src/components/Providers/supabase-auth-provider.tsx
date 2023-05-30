"use client";

import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { supabase } from "@/lib/supabase";

interface ContextI {
  user: any;
  error: any;
  isLoading: boolean;
  mutate: any;
  signOut: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<string | null>;
}
const Context = createContext<ContextI>({
  user: null,
  error: null,
  isLoading: true,
  mutate: null,
  signOut: async () => {},
  signInWithMagicLink: async (email: string) => null,
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const router = useRouter();
  console.log("serverSession", serverSession);

  // Get USER
  const getUser = async () => {
    const { data: user, error } = await supabase.from("user").select("*");
    //   .eq("id", serverSession?.user?.id)

    if (error) {
      console.log(error);
      return null;
    } else {
      console.log("user", user);
      return user;
    }
  };

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(serverSession ? "profile-context" : null, getUser);

  console.log("data", user);

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign-In with Email
  const signInWithMagicLink = async (email: string) => {
    const { error, data } = await supabase.auth.signInWithOtp({
      email,
    });

    console.log("mlr", data);

    if (error) {
      return error.message;
    }

    return null;
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }
      console.log("session", session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const exposed: ContextI = {
    user,
    error,
    isLoading,
    mutate,
    signOut,
    signInWithMagicLink,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};
