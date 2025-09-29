"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`/api/auth/get-token`, {
          cache: "no-store", // ensure fresh cookie every time
        });

        if (!res.ok) throw new Error("Failed to fetch token");

        const data = await res.json();

        // Get query params manually from window.location
        const searchParams = typeof window !== "undefined" ? window.location.search : "";
        
        if (!data.token) {
          const currentUrl = pathname + searchParams;
          router.push(`/signin?returl=${encodeURIComponent(currentUrl)}`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        const searchParams = typeof window !== "undefined" ? window.location.search : "";
        const currentUrl = pathname + searchParams;
        router.push(`/signin?returl=${encodeURIComponent(currentUrl)}`);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (loading)
    return <p className="p-6 text-center">Checking authentication...</p>;

  return <>{children}</>;
}
