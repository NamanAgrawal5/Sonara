import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { getSongsByUserId } from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductWithPrices";
import { getLibraryByUserId } from "@/actions/getLibraryByUserId";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonara",
  description: "Vibes to rhymes!",
};
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const userLibrary = await getLibraryByUserId();
  const products = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} /> 
            <Sidebar songs ={userSongs} libraries={userLibrary}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
