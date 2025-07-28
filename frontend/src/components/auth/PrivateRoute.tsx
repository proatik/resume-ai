"use client";

import { useEffect } from "react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const Redirecting = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-64px)] px-4">
      <div className="flex flex-col items-center text-center">
        <LogIn className="w-16 h-16 text-blue-400 animate-pulse" />
        <div className="mt-3 text-xl font-medium text-gray-300">
          You must login first
        </div>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return <Redirecting />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
