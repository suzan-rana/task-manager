'use client'
import GlobalProvider, {
  GlobalContext,
  useGlobalContext,
} from "@/context/GlobalContext";
import "./globals.css";
import { Poppins } from "next/font/google";
import Modal from "@/components/UI/Modal";

const p = Poppins({ subsets: ["latin"], weight: "400" });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalProvider>
        <body className={`${p.className} w-[80%] mx-auto`}>{children}</body>
      </GlobalProvider>
    </html>
  );
}
const DeleteModal = ({ taskId }: { taskId: string }) => {
  return (
    <Modal>
      <h1>Delete Modal</h1>
    </Modal>
  );
};
