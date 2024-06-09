'use client'
import RoutGuard from "./components/Guard/RoutGuard";
import "./globals.css";
import StoreProvider from "./storeProvider";
import "./translation/i18n";
// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Report Design</title>
      </head>
      <body>
        <StoreProvider>
          <RoutGuard>
            {children}
          </RoutGuard>
        </StoreProvider>
      </body>
    </html>
  );
}
