"use client";

import { useEffect, useState } from "react";
import SignInForm from "@/components/auth/SignInForm";

export default function SignIn() {
  const [returl, setReturl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      
      setReturl(params.get("returl") || "");
    }
  }, []);

  
  return <SignInForm returl={returl} />;
}
