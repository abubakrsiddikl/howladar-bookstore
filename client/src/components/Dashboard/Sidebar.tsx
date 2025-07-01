"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  const role = user?.role;

  const links =
    role === "admin"
      ? [
          { href: "/dashboard/admin", label: "Dashboard" },
          { href: "/dashboard/store/books", label: "Books" },
          { href: "/dashboard/store/orders", label: "Orders" },
          { href: "/dashboard/admin/users", label: "Users" },
        ]
      : [
          { href: "/dashboard/store", label: "Dashboard" },
          { href: "/dashboard/store/books", label: "Books" },
          { href: "/dashboard/store/orders", label: "Orders" },
        ];

  return (
    <aside className="w-1/5 bg-white shadow-md">
      <div className="p-4 text-2xl font-bold text-blue-600 border-b">
        Dashboard
      </div>
      <nav className="p-4 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded hover:bg-blue-100 ${
              pathname === link.href
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
