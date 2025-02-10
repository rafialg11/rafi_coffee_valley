"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/login"); // Redirect ke login jika tidak ada cookie
      }
    };

    checkAuth();
  }, []);

  return { user };
}
