"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function AuthAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        debugger;
        
        const res = await fetch(`/api/auth/get-token`, {
          cache: "no-store", // ensure fresh cookie every time
        });

        if (!res.ok) throw new Error("Failed to fetch token");

        const data = await res.json();

        if (!data.token) {
          const currentUrl =
            pathname + (searchParams.toString() ? `?${searchParams}` : "");
            router.push(`/signin?returl=${encodeURIComponent(currentUrl)}`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        const currentUrl =
          pathname + (searchParams.toString() ? `?${searchParams}` : "");
        router.push(`/signin?returl=${encodeURIComponent(currentUrl)}`);
      }
    };

    checkAuth();
  }, [router, pathname, searchParams]);

  if (loading)
    return <p className="p-6 text-center">Checking authentication...</p>;

  return <>{children}</>;
}
