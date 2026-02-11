import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistMono = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Learning Management System",
  description:
    "A learning management system (LMS) is a software application that provides a platform for the administration, documentation, tracking, reporting, and delivery of educational courses or training programs. It allows educators to create and manage online courses, deliver content to students, and track their progress. LMSs are commonly used in educational institutions, corporate training programs, and other learning environments to facilitate online learning and training.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`light bg-background text-foreground ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
