import AuthNav from "./_components/AuthNav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthNav />
      {children}
    </div>
  );
};

export default AuthLayout;
