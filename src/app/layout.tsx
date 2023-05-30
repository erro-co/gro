"use client";
import "./globals.css";
import { FC } from "react";

export interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
