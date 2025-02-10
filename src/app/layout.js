import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import coffeeCup from "../../public/coffee-cup.svg";

 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Coffee Valley",
  description: "Taste The Love in Every Cup",
};

const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <div className="flex flex-col">        
          <header className="flex-1 mx-12 my-5">
            <Image className="w-16" src={coffeeCup} alt="coffee cup" />
            <h1 className="text-lg font-bold">Coffee Valley</h1>
            <h2 className="text-md font-semibold">Taste The Love in Every Cup</h2>
            <p className="text-xs">One Alewife Center 3rd Floor</p>
            <p className="text-xs">Cambridge, MA 02140</p>
          </header>
          {children}
          <footer className="flex align-end justify-center mt-24" style={{ position: 'relative', bottom: 20, left: 0, right: 0 }}>
            {/* Get Now Date and Time in format Today's Date: March 21, 2002*/}
            <p className="text-xs">Today's Date: {formattedDate}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
