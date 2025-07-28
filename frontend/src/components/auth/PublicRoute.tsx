"use client";

import { useEffect } from "react";
import { UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

type PublicRouteProps = {
  children: React.ReactNode;
};

const Redirecting = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-64px)] px-4">
      <div className="flex flex-col items-center text-center">
        <UserCheck className="w-16 h-16 text-emerald-400 animate-pulse" />
        <div className="mt-3 text-xl font-medium text-gray-300">
          You're already logged in
        </div>
      </div>
    </div>
  );
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <Redirecting />;
  }

  return <>{children}</>;
};

export default PublicRoute;
