import "./globals.css";
import { Web3Modal } from "@/app/context/Web3Modal";

export const metadata = {
  title: "WalletConnect Reputation",
  description: "A read-only dashboard that visualizes public on-chain behavior for WalletConnect-connected wallets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "transp" }}>
        {/* Global Background Elements */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="wc-bg-video"
        >
          <source src="/wc-globe-loop.mp4" type="video/mp4" />
        </video>
        <div className="wc-bg-overlay" />

        <Web3Modal>
          {children}
        </Web3Modal>
      </body>
    </html>
  );
}