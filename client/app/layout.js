import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Kwatt Achievement Tracker",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <UserProvider>
                <body className={inter.className}>
                    <Header />
                    <div className="min-h-[100vh]">{children}</div>
                    <Footer />
                </body>
            </UserProvider>
        </html>
    );
}