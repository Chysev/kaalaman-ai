import type { Metadata } from "next";

import "@css/globals.css";
import "@mantine/core/styles.css";
import "@mantine/core/styles/Loader.css";

import { MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "Kaalaman-AI",
  description: "A.I Website Developed by Chysev",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="dark:bg-slate-900">
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
