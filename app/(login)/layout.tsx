import { Metadata } from "next";
import "../globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forkee | Connexion",
  description: "Dashboard Forkee.",
};

export default function LoginLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="grid grid-cols-dashboard font-raleway relative">
        <aside
          className="sticky top-0 bg-black text-white p-12 h-screen flex
            flex-col justify-between items-end"
        >
          <Image
            src="/logo-icon-white.svg"
            alt="Forkee white star"
            width={50}
            height={50}
          />
          <Image
            src="/logo-icon-white.svg"
            alt="Forkee white star"
            width={50}
            height={50}
          />
        </aside>
        <main className="flex flex-col justify-center p-16 gap-16">
          <Image
            src="/logo.svg"
            alt="Forkee logo"
            width={100}
            height={50}
          />
          <div className=" flex flex-col gap-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
