import "./globals.css";

export const metadata = {
  title: "KISS 95.7 Widget",
  description: "Full-screen live radio display for KISS 95.7"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
