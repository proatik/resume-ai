import { Metadata } from "next";

import RegisterForm from "@/components/auth/Register";

export const metadata: Metadata = {
  title: "Register | Resume AI",
  description: "Create a new account to start parsing resume with AI support.",
};

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-64px)]">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
