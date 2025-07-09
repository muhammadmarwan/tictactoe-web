import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Tic Tac Toe App",
  description: "Play Tic Tac Toe with AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-indigo-600 text-white">
          <h1 className="text-xl font-bold">Tic Tac Toe</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
