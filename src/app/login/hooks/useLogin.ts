// useLogin.ts
import { supabaseValueExists } from "@/lib/helpers";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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

export function useLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<LoginErrors>(null);
  const [view, setView] = useState<LoginViews>("sign-in");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  // ... All the other business logic and methods such as handleSignUp, handleSignIn, etc
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

  return {
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
    setLoginError,
    view,
    setView,
    loading,
    setLoading,
    handleSignUp,
    handleSignIn,
    // ... other returned variables and methods
  };
}
