import Header from "@/components/header";
import Footer from "@/components/landing/Footer";

const WithNavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default WithNavbarLayout;
