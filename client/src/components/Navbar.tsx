"use client";

import { logout } from "@/lib/logout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };
    fetchUser();
  }, []);
  const handleLogut = async () => {
    await logout();
    setIsLoggedIn(false)
    router.push("/");
  };
  const navLink = (
    href: string,
    label: string,
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  ) => (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        pathname === href
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-700">
          Howladar Prokashoni
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2">
          {navLink("/", "Home")}
          {navLink("/books", "Books")}
          {isLoggedIn && navLink("/orders", "Orders")}
          {isLoggedIn && navLink("/dashboard", "Dashboard")}
          {!isLoggedIn
            ? navLink("/login", "Login")
            : navLink("/logout", "Logout",handleLogut)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
