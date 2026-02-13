"use client";

import { useState, useEffect, useRef } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers"; 
import abi from "./abi.json"; // ✅ Path fixed: abi.json dashboard folder mein rakhein

// ✅ IMPORT THE CAT COMPONENT
import SleepingCat from "@/components/SleepingCat"; 

// 🔴 APNA DEPLOYED CONTRACT ADDRESS YAHAN DALEIN
const CONTRACT_ADDRESS = "0x71E63142275F1D5B9F82122a4D6f52f129B1d045"; 

// ============================================================================
// 1. COMPONENT: FUTURISTIC SCANNER (Holographic Logo)
// ============================================================================
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "radial-gradient(circle at center, #1a1a2e 0%, #020105 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(18, 16, 23, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "relative", width: "320px", height: "320px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px", zIndex: 10 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "60px", height: "60px", borderTop: "2px solid #a78bfa", borderLeft: "2px solid #a78bfa", borderTopLeftRadius: "16px" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", borderTop: "2px solid #a78bfa", borderRight: "2px solid #a78bfa", borderTopRightRadius: "16px" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "60px", height: "60px", borderBottom: "2px solid #a78bfa", borderLeft: "2px solid #a78bfa", borderBottomLeftRadius: "16px" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "60px", height: "60px", borderBottom: "2px solid #a78bfa", borderRight: "2px solid #a78bfa", borderBottomRightRadius: "16px" }} />
        
        <div style={{ position: "relative", width: "160px", height: "auto" }}>
          {/* ✅ SVG FIXED with escaped characters */}
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 10px rgba(59, 153, 252, 0.6))" }}>
            <motion.path
              d="M6.02 7.03L3.55 9.5a.75.75 0 000 1.06l8.47 8.47 8.47-8.47a.75.75 0 000-1.06l-2.47-2.47a.75.75 0 00-.53-.22.75.75 0 00-.53.22L12.5 11.5 8.03 7.03a.75.75 0 00-1.06 0z M26.45 9.5l-2.47-2.47a.75.75 0 00-1.06 0l-4.47 4.47-4.47-4.47a.75.75 0 00-1.06 0l-2.47 2.47a.75.75 0 000 1.06l8 8a.75.75 0 001.06 0l8-8a.75.75 0 000-1.06z"
              stroke="#3B99FC" strokeWidth="0.5" fill="rgba(59, 153, 252, 0.1)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0], fillOpacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <motion.div
            style={{ position: "absolute", left: "-10%", width: "120%", height: "2px", background: "linear-gradient(90deg, transparent, #7c3aed, #3b99fc, transparent)", boxShadow: "0 0 20px 2px rgba(124, 58, 237, 0.8)", zIndex: 20 }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "10px", zIndex: 10 }}>
        <div style={{ width: "100%", height: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "linear" }} style={{ height: "100%", background: "linear-gradient(90deg, #5b21b6, #7c3aed)", position: "relative" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.5) 5px, rgba(0,0,0,0.5) 10px)", opacity: 0.5 }} />
        </div>
        <motion.p initial={{ opacity: 0.5 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase" }}>Analyzing Chain History...</motion.p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// 2. MAIN DASHBOARD PAGE
// ============================================================================
export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Wagmi Hooks for reading contract data
  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'balanceOf',
    args: [address],
    chainId: 8453,
    query: { enabled: isConnected && !!address },
  });

  const hasToken = !!balanceData && Number(balanceData) > 0;

  const { data: tokenIdData, refetch: refetchTokenId } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, 0], // Assuming one badge per user
    chainId: 8453,
    query: { enabled: isConnected && !!address && hasToken },
  });

  const { data: mintedScoreData, refetch: refetchMintedScore } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'scores',
    args: [tokenIdData], // Use the fetched tokenId
    chainId: 8453,
    query: { enabled: isConnected && !!address && !!tokenIdData },
  });

  // States
  const [data, setData] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  // MINTING & UPGRADE STATES
  const [mintLoading, setMintLoading] = useState(false);
  const [mintStatus, setMintStatus] = useState("");
  const [userTokenId, setUserTokenId] = useState<number | null>(null);
  const [mintedScore, setMintedScore] = useState<number | null>(null);

  const hasFetched = useRef(false);

  // --- AUTOMATIC LOGIC: CONNECT -> SCAN -> FETCH ---
  useEffect(() => {
    if (isConnected && address && !data && !hasFetched.current) {
      hasFetched.current = true;
      setIsScanning(true); 

      setTimeout(async () => {
        try {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address, isWalletConnected: true }),
          });
          const result = await res.json();
          
          setData(result); 
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#26D97F', '#004BFF', '#FFD700'] });

        } catch (err) {
          console.error("Analysis failed", err);
          hasFetched.current = false;
        } finally {
          setIsScanning(false);
        }
      }, 3000); 
    }
  }, [isConnected, address, data]);

  // --- ANIMATE SCORE EFFECT ---
  useEffect(() => {
    if (data?.score) {
      let start = 0;
      const end = data.score;
      const duration = 1500;
      const incrementTime = duration / end;
      const timer = setInterval(() => {
        start += 1;
        setAnimatedScore(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [data]);

  // --- UPDATE MINTED BADGE INFO FROM TOP-LEVEL HOOKS ---
  useEffect(() => {
    if (isConnected && address) {
      if (hasToken && tokenIdData !== undefined && mintedScoreData !== undefined) {
        setUserTokenId(Number(tokenIdData));
        setMintedScore(Number(mintedScoreData));
      } else {
        setUserTokenId(null);
        setMintedScore(null);
      }
    } else {
      setUserTokenId(null);
      setMintedScore(null);
    }
  }, [isConnected, address, hasToken, tokenIdData, mintedScoreData]);

  // ✅ MINT / UPGRADE FUNCTION (With (window as any) Fix)
  const mintBadge = async () => {
    if (!(window as any).ethereum && !isConnected) return alert("Please Connect Wallet first!");
    setMintLoading(true);
    setMintStatus("⏳ Generating Secure Signature...");

    try {
      const response = await fetch("/api/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress: address, score: data?.score || 0 }),
      });

      const resData = await response.json();
      if (resData.error) throw new Error(resData.error);
      const signature = resData.signature;

      setMintStatus("🦊 Confirm in your Wallet...");

      const isUpgrade = userTokenId !== null;
      const functionName = isUpgrade ? "updateScore" : "mintScore";
      const price = isUpgrade ? ethers.parseEther("0.0002") : ethers.parseEther("0.0004");
      const score = BigInt(data?.score || 0);
      const args = isUpgrade
        ? [BigInt(userTokenId as number), score, signature]
        : [score, signature];

      await writeContractAsync({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: abi as const, // ✅ Ensure ABI is correctly typed for viem
        functionName: functionName,
        args: args,
        value: price,
        chainId: 8453,
      });
      
      setMintStatus("✅ Transaction Sent!");
      alert("Badge Processed! 🎉");

      // Refetch badge info after a successful mint/upgrade
      refetchBalance();
      refetchTokenId();
      refetchMintedScore();

    } catch (error: any) {
      console.error(error);
      setMintStatus("❌ Error: " + (error.shortMessage || error.message || "Failed"));
    }
    setMintLoading(false);
  };

  const handleShare = () => {
    if (!data) return;
    const text = `I just analyzed my on-chain behavior! 📊\n\nMy Wallet Reputation Score: ${data.score}/100 🚀\nActive Chains: ${data.stats.activeChains}\n\nCheck your score here 👇\nhttps://walletconnect.network`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const currentDashboardScore = data?.score || 0;
  const currentMintedScore = mintedScore !== null ? mintedScore : 0;

  const buttonText = !hasToken
    ? "MINT ON-CHAIN BADGE"
    : (currentDashboardScore <= currentMintedScore)
      ? "BADGE MINTED ✅"
      : "UPGRADE YOUR BADGE ⚡";

  const isButtonDisabled = mintLoading ||
    !isConnected || // Disable if not connected
    (hasToken && currentDashboardScore <= currentMintedScore);

  const buttonStyle = isButtonDisabled
    ? { background: "rgba(38, 217, 127, 0.4)", color: "white", padding: "15px 40px", borderRadius: "12px", cursor: "not-allowed", fontWeight: "bold" }
    : { background: "linear-gradient(to right, #10b981, #3b82f6)", color: "white", padding: "15px 40px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" };

  return (
    <main style={{ minHeight: "100vh", background: "#020105", color: "white", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      
      {/* BACKGROUNDS */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url(/network-lines.svg.jpg)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.8) contrast(1.2) hue-rotate(240deg)", opacity: 0.4 }} />
      <div style={{ position: "fixed", top: "55%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", zIndex: 1, opacity: 0.8, mixBlendMode: "screen", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "screen" }}><source src="/globe.svg" type="video/mp4" /><source src="/globe.mp4" type="video/mp4" /></video>
      </div>

      {/* TOP TICKER */}
      <div style={{ width: "100%", background: "rgba(5, 5, 5, 0.84)", position: "fixed", top: 0, left: 0, zIndex: 9999, borderBottom: "1px solid rgba(14, 15, 15, 0.91)", overflow: "hidden" }}>
        <div style={{ display: "inline-block", whiteSpace: "nowrap", padding: "8px 0", animation: "ticker 20s linear infinite", color: "#fff", fontSize: 13, fontWeight: "500" }}>
            No airdrops. No rewards. No eligibility. Informational use only. &nbsp;&nbsp;&nbsp;&nbsp; No airdrops. No rewards. No eligibility. Informational use only.
        </div>
      </div>

      <AnimatePresence>
        {isScanning && <LoadingScreen />}
      </AnimatePresence>

      {!data && !isScanning && (
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "20px", textAlign: "center" }}>
           <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "20px", background: "linear-gradient(to bottom, #ffffff 30%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
             Connect Your Wallet
           </h1>
           <div style={{ transform: "scale(1.2)" }}>
             {/* @ts-ignore */}
             <w3m-button />
           </div>
        </div>
      )}

      {/* 📊 DATA DASHBOARD STATE (ORIGINAL DESIGN PRESERVED) */}
      {data && !isScanning && (
        <div style={{ position: "relative", zIndex: 10, padding: "120px 20px 60px", maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
             <div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "5px" }}>Analysis Report</h1>
                <p style={{ color: "#9ca3af" }}>Connected: <span style={{ color: "#7c3aed", fontFamily: "monospace" }}>{address}</span></p>
             </div>
             <button onClick={handleShare} style={{ background: "#1DA1F2", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
               Share on X 🐦
             </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px" }}>
             <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px", gap: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%", alignItems: "center", gap: "20px" }}>
                  <div style={{ position: "relative", width: "200px", height: "200px" }}>
                     <svg className="w-full h-full transform -rotate-90" viewBox="0 0 288 288">
                        <circle cx="144" cy="144" r="120" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                        <circle cx="144" cy="144" r="120" stroke="url(#gradient)" strokeWidth="12" fill="transparent" strokeDasharray={754} strokeDashoffset={754 - (754 * animatedScore) / 100} strokeLinecap="round" />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="#3b82f6" />
                             <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                     </svg>
                     <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "3rem", fontWeight: "bold" }}>{animatedScore}</span>
                        <span style={{ color: "#a78bfa", textTransform: "uppercase", fontSize: "0.7rem" }}>Reputation</span>
                     </div>
                  </div>
                  <SleepingCat />
                </div>

                <div style={{ width: "100%", textAlign: "center" }}>
                   <button 
                     onClick={mintBadge}
                     disabled={isButtonDisabled}
                     style={buttonStyle}
                   >
                     {buttonText}
                   </button>
                   {mintStatus && <p style={{ marginTop: "12px", color: "#fbbf24", fontWeight: "bold" }}>{mintStatus}</p>}
                </div>
             </div>

             <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { label: "Total Transactions", value: data?.stats?.totalTransactions ?? 0, icon: "📊" },
                  { label: "Active Chains", value: data?.stats?.activeChains ?? 0, icon: "🔗" },
                  { label: "Contracts Interacted", value: data?.stats?.contractsDeployed ?? 0, icon: "📝" }
                ].map((item, i) => (
                   <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "20px 30px", display: "flex", justifyContent: "space-between" }}>
                      <div>
                         <p style={{ color: "#9ca3af" }}>{item.label}</p>
                         <h3 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{item.value}</h3>
                      </div>
                      <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* ACHIEVEMENTS & CHAIN BREAKDOWN */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px" }}>
             <div style={{ background: "#0a0814", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "30px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "20px" }}>Achievements</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                   {(data?.badges ?? []).map((b: string) => (
                      <span key={b} style={{ background: "rgba(124, 58, 237, 0.2)", color: "#a78bfa", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem" }}>🏆 {b}</span>
                   ))}
                </div>
             </div>
             <div style={{ background: "#0a0814", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "30px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "20px" }}>Chain Breakdown</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                   {Object.entries(data?.stats?.chainsBreakdown ?? {}).map(([chain, info]: any) => (
                      <div key={chain} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                         <span style={{ textTransform: "capitalize" }}>{chain}</span>
                         <span style={{ fontWeight: "bold" }}>{info.transactions} txns</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* ADVICE SECTION */}
          <div style={{ marginTop: "40px" }}>
             <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "30px" }}>Reputation Optimization Protocol</h3>
             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
                <div style={{ background: "linear-gradient(145deg, #0f0c29, #1c192e)", padding: "30px", borderRadius: "20px" }}>
                   <h4 style={{ color: "#a78bfa", marginBottom: "15px" }}>Network Diversification</h4>
                   <p style={{ color: "#d1d5db", fontSize: "0.95rem" }}>Expand your on-chain footprint across major Layer-2 solutions. Multi-chain activity signals a sophisticated participant.</p>
                </div>
                <div style={{ background: "linear-gradient(145deg, #0f0c29, #1c192e)", padding: "30px", borderRadius: "20px" }}>
                   <h4 style={{ color: "#a78bfa", marginBottom: "15px" }}>Protocol Interaction Depth</h4>
                   <p style={{ color: "#d1d5db", fontSize: "0.95rem" }}>Execute complex smart contract interactions such as Staking and Governance Voting on blue-chip protocols.</p>
                </div>
                <div style={{ background: "linear-gradient(145deg, #0f0c29, #1c192e)", padding: "30px", borderRadius: "20px" }}>
                   <h4 style={{ color: "#a78bfa", marginBottom: "15px" }}>Temporal Consistency</h4>
                   <p style={{ color: "#d1d5db", fontSize: "0.95rem" }}>Maintain regular activity intervals over extended periods. Consistent activity build trust.</p>
                </div>
             </div>
          </div>

        </div>
      )}
      
      <footer style={{ background: "#020105", padding: "60px 20px", textAlign: "center" }}>
          <img src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg" alt="Logo" style={{ height: '30px', margin: "0 auto 20px" }} />
          <p style={{ color: "#6b7280" }}>WalletConnect Reputation · Informational use only</p>
      </footer>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #020105; overflow-x: hidden; }
        @keyframes ticker { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
      `}</style>
    </main>
  );
}