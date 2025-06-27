"use client";

import { useAuth } from "@/context/AuthContext";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCartContext } from "@/hooks/useCartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCartContext();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
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
          হাওলাদার প্রকাশনী
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navLink("/", "Home")}
          {navLink("/books", "Books")}
          {user && navLink("/orders", "Orders")}
          {user && navLink("/dashboard", "Dashboard")}
          {!user ? (
            navLink("/login", "Login")
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          )}
          {navLink("/register", "Register")}

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center px-3 py-2 rounded-md hover:bg-gray-200"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-200"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          {navLink("/", "Home")}
          {navLink("/books", "Books")}
          {user && navLink("/orders", "Orders")}
          {user && navLink("/dashboard", "Dashboard")}
          {!user ? (
            navLink("/login", "Login")
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          )}
          {navLink("/register", "Register")}

          {/* Cart */}
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
    </nav>
  );
};

export default Navbar;
