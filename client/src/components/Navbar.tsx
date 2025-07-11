"use client";

import { useAuth } from "@/context/AuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCartContext();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  // console.log("navbar",user)
  const handleLogout = async () => {
    await logout();
    toast.success("Logout successfull");
    router.push("/");
  };

  // role based admin route
  const dashboardRoute =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "store-manager"
      ? "/dashboard/store"
      : "/profile";

  // NavLink Generator
  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        pathname === href
          ? " underline text-white"
          : "text-white hover:text-[#FF8600]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-[#727088] shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          হাওলাদার প্রকাশনী
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 ">
          {navLink("/", "Home")}
          {user && navLink("/orders", "Orders")}
          {user && navLink(dashboardRoute, "Dashboard")}

          {!user ? (
            <>
              {navLink("/login", "Login")}
              {navLink("/register", "Register")}
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center px-3 py-2 rounded-md hover:underline"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-200"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          {navLink("/", "Home")}
          {user && navLink("/orders", "Orders")}
          {user && navLink(dashboardRoute, "Dashboard")}

          {!user ? (
            <>
              {navLink("/login", "Login")}
              {navLink("/register", "Register")}
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          )}

          {/* ✅ Cart */}
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative flex items-center px-3 py-2 rounded-md hover:bg-gray-200"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
            <span className="ml-2">Cart</span>
          </Link>
        </div>
      )}
      <SearchInput></SearchInput>
    </nav>
  );
};

export default Navbar;
