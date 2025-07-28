import PublicRoute from "@/components/auth/PublicRoute";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <PublicRoute>{children}</PublicRoute>;
};

export default PublicLayout;
