import { Metadata } from "next";

import LoginForm from "@/components/auth/Login";

export const metadata: Metadata = {
  title: "Login | Resume AI",
  description: "Login to access your parsed resume and AI assistant.",
};

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-64px)]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
