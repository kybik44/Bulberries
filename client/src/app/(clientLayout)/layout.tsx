import SubNavbar from "@/components/SubNavbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Create Bulberries",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNavbar />
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </>
  );
}
