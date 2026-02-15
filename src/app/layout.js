import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from '@clerk/nextjs'


const geistMono = Anek_Bangla({
  variable: "--font-inter",
  subsets: ["latin"],
  weight:["100","200","300", "400"]
});

export const metadata = {
  title: "Learning Management System",
  description:
    "A learning management system (LMS) is a software application that provides a platform for the administration, documentation, tracking, reporting, and delivery of educational courses or training programs. It allows educators to create and manage online courses, deliver content to students, and track their progress. LMSs are commonly used in educational institutions, corporate training programs, and other learning environments to facilitate online learning and training.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <ClerkProvider  
       appearance={{
    variables: { colorPrimary: '#F53D2F' },
   
     
       }}
     >
       <body className={`light  text-foreground ${geistMono.variable} antialiased`}>
          {children}
      </body>
      </ClerkProvider> 
     
    </html>
  );
}
