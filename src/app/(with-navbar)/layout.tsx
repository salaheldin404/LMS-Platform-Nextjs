import Header from "@/components/header";

const WithNavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default WithNavbarLayout;
