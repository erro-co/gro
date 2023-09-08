import "./globals.css";

export const metadata = {
  title: "Gro",
  description: "The home of everything Gro",
  icons: {
    icon: "/gro_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="h-screen">{children}</main>
      </body>
    </html>
  );
}
