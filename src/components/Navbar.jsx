"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // Cek route yang sedang aktif

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  // Jika belum login, tidak render Navbar
  if (!user) return null;

  // Fungsi untuk mengecek apakah route aktif
  const isActive = (route) => pathname === route;

  return (
    <nav className="p-4 text-white flex justify-center">
      <div>
        <Link
          href="/"
          className={`px-4 py-2 mx-1 ${
            isActive("/") ? "bg-blue-500" : "bg-red-400"
          }`}
        >
          Home
        </Link>
        <Link
          href="/catalogue"
          className={`px-4 py-2 mx-1 ${
            isActive("/catalogue") ? "bg-blue-500" : "bg-red-400"
          }`}
        >
          Catalogue
        </Link>
        <Link
          href="/distributors"
          className={`px-4 py-2 mx-1 ${
            isActive("/distributors") || pathname.startsWith("/distributors/") ? "bg-blue-500" : "bg-red-400"
          }`}
        >
          Distributors
        </Link>
        <Link
          href="/upload"
          className={`px-4 py-2 mx-1 ${
            isActive("/upload") ? "bg-blue-500" : "bg-red-400"
          }`}
        >
          Upload
        </Link>
        <button onClick={handleLogout} className="bg-red-500 px-2 py-1.5 mx-1">
          Logout
        </button>
      </div>
    </nav>
  );
}
