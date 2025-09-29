"use client"
import SignInForm from "@/components/auth/SignInForm";
// import { useRouter, useSearchParams } from "next/navigation";

//  const metadata = {
//   title: "Admin Sign In | TailAdmin",
//   description: "This is Next.js Signin Page TailAdmin Dashboard Template",
// };



export default function SignIn() {

  // const searchParams = useSearchParams();
  // const router = useRouter();

  // const returl = searchParams.get("returl") || ""; // default redirect



  return <SignInForm returl={""} />;
}
