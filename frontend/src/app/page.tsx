import Link from "next/link";
import { Metadata } from "next";
import { FileUp, FileText, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Home | Resume AI",
  description:
    "Welcome to Resume AI – your smart assistant for resume parsing and chat.",
};

const HomePage = () => {
  const links = [
    {
      href: "/upload-resume",
      icon: <FileUp size={32} />,
      label: "Upload Resume",
      hoverColor: "hover:text-emerald-400 hover:border-emerald-400/50",
    },
    {
      href: "/parsed-resume",
      icon: <FileText size={32} />,
      label: "Parsed Resume",
      hoverColor: "hover:text-violet-400 hover:border-violet-400/50",
    },
    {
      href: "/ai-chat",
      icon: <Bot size={32} />,
      label: "AI Chat",
      hoverColor: "hover:text-sky-400 hover:border-sky-400/50",
    },
  ];

  return (
    <div className="h-[calc(100dvh-64px)] flex flex-col items-center justify-center text-white px-4 space-y-10">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white">
        Welcome to{" "}
        <span className="text-indigo-400 animate-text-flash">Resume AI</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center h-32 border-2 border-gray-700 text-gray-400 rounded-md transition-colors duration-300 ${link.hoverColor}`}
          >
            {link.icon}
            <span className="mt-2 text-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
