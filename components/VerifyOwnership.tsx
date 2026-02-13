"use client";

import { useState } from "react";
import { useSignMessage, useAccount } from "wagmi";

export default function VerifyOwnership() {
  const { address } = useAccount();
  const { signMessage } = useSignMessage();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!address) return;

    setLoading(true);
    const message = `I verify that I own ${address} for WalletConnect Reputation. Timestamp: ${Date.now()}`;

    signMessage(
      { message },
      {
        // Fix: Curly brackets {} lazmi hain multiple lines ke liye
        onSuccess: () => { 
          setIsVerified(true);
          setLoading(false);
          // Security Fix: console.log(data) yahan se remove kar diya gaya hai
        },
        onError: (error) => {
          // Technical error log (non-sensitive)
          console.error("Verification failed", error);
          setLoading(false);
        },
      }
    );
  };

  if (!address) return null;

  if (isVerified) {
    return (
      <div className="mt-4 px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg inline-flex items-center gap-2">
        <span>Verified Owner</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    );
  }

  return (
    <button
      onClick={handleVerify}
      disabled={loading}
      className={`mt-4 px-6 py-2 rounded-lg font-bold transition-all ${
        loading
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
      }`}
    >
      {loading ? "Requesting Signature..." : "Verify Ownership ✍️"}
    </button>
  );
}