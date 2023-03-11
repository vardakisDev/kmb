import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Navbar />
      <body>
        <Main />
        <NextScript />
      </body>
      <footer className=" border-t my-4">
        <Footer />
      </footer>
    </Html>
  );
}
