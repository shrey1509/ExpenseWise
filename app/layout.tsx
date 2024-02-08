import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import MainComponent from "@/components/MainComponent";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "ExpenseWise",
  description: "Personal Finance, yours to master.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} w-screen h-screen overflow-hidden bg-lightBg`}>
        <header className=" fixed w-full block xl:hidden p-defaultMobile xl:p-default z-50">
          <Header />
        </header>
        <div className=" flex w-full h-full">
          <nav className=" h-full hidden xl:block xl:w-1/4 2xl:w-1/5 text-darkBg">
            <Navbar />
          </nav>
          <main className=" pt-20 p-defaultMobile xl:p-default w-full">
            <MainComponent children={children} />
          </main> 
        </div>
        {children}
      </body>
    </html>
  );
}
