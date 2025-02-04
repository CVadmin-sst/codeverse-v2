import "./globals.css";
import Navbar from "./components/navbar/navbar";

export const metadata = {
  title: "CodeVerse",
  description: "Codeverse is a platform for learning and teaching programming.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
