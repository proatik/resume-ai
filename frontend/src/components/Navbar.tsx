"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bot, FileText, FileUp, LogIn, LogOut } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const navLinks = [
    {
      href: "/upload-resume",
      label: "Upload",
      icon: <FileUp size={18} />,
      activeColor: "text-emerald-400",
    },
    {
      href: "/parsed-resume",
      label: "Parsed",
      icon: <FileText size={18} />,
      activeColor: "text-violet-400",
    },
    {
      href: "/ai-chat",
      label: "Chat",
      icon: <Bot size={18} />,
      activeColor: "text-sky-400",
    },
  ];

  return (
    <nav className="sticky top-0 z-20 w-full py-2 bg-neutral-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/document.png" alt="Logo" width={40} height={40} />
          <span className="font-semibold text-lg hidden sm:inline animate-text-flash">
            Resume AI
          </span>
        </Link>

        <div className="hidden sm:flex gap-4 items-center text-gray-300">
          {navLinks.map(({ href, label, icon, activeColor }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1 transition-all ${
                  isActive ? `${activeColor}` : `hover:${activeColor}`
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 cursor-pointer">
          {user ? (
            <>
              <span className="text-md font-medium text-gray-300 hidden sm:inline">
                {user.name}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 transition-all cursor-pointer"
              >
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer"
            >
              <LogIn size={16} />
              <span className="text-sm">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
