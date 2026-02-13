"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// 1. DATA: SUPPORTED CHAINS (For Marquee)
// ============================================================================
const supportedChains = [
  "Ethereum",
  "Base",
  "Optimism",
  "Arbitrum",
  "Polygon",
  "Solana",
  "Avalanche",
  "BSC",
  "ZkSync",
  "Linea",
  "Scroll",
  "Gnosis",
];

// ============================================================================
// 2. COMPONENT: FUTURISTIC LOADING SCANNER (New Feature)
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
      {/* Background Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(18, 16, 23, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 2px, 3px 100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main Scanner Frame */}
      <div
        style={{
          position: "relative",
          width: "320px",
          height: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
          zIndex: 10,
        }}
      >
        {/* Frame Corners */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "60px", height: "60px", borderTop: "2px solid rgba(167, 139, 250, 0.5)", borderLeft: "2px solid rgba(167, 139, 250, 0.5)", borderRadius: "16px 0 0 0" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", borderTop: "2px solid rgba(167, 139, 250, 0.5)", borderRight: "2px solid rgba(167, 139, 250, 0.5)", borderRadius: "0 16px 0 0" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "60px", height: "60px", borderBottom: "2px solid rgba(167, 139, 250, 0.5)", borderLeft: "2px solid rgba(167, 139, 250, 0.5)", borderRadius: "0 0 0 16px" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "60px", height: "60px", borderBottom: "2px solid rgba(167, 139, 250, 0.5)", borderRight: "2px solid rgba(167, 139, 250, 0.5)", borderRadius: "0 0 16px 0" }} />

        {/* Holographic Wireframe Logo */}
        <div style={{ position: "relative", width: "160px", height: "auto" }}>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 10px rgba(59, 153, 252, 0.6))" }}>
            <motion.path
              d="M6.02 7.03L3.55 9.5a.75.75 0 000 1.06l8.47 8.47 8.47-8.47a.75.75 0 000-1.06l-2.47-2.47a.75.75 0 00-.53-.22.75.75 0 00-.53.22L12.5 11.5 8.03 7.03a.75.75 0 00-1.06 0z M26.45 9.5l-2.47-2.47a.75.75 0 00-1.06 0l-4.47 4.47-4.47-4.47a.75.75 0 00-1.06 0l-2.47 2.47a.75.75 0 000 1.06l8 8a.75.75 0 001.06 0l8-8a.75.75 0 000-1.06z"
              stroke="#3B99FC"
              strokeWidth="0.5"
              fill="rgba(59, 153, 252, 0.1)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0], 
                opacity: [0, 1, 1, 0],
                fillOpacity: [0, 0.5, 0.5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          {/* Laser Scanning Beam */}
          <motion.div
            style={{
              position: "absolute",
              left: "-10%",
              width: "120%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #7c3aed, #3b99fc, transparent)",
              boxShadow: "0 0 20px 2px rgba(124, 58, 237, 0.8)",
              zIndex: 20,
            }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "10px", zIndex: 10 }}>
        <div style={{ width: "100%", height: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                style={{ height: "100%", background: "linear-gradient(90deg, #5b21b6, #7c3aed)", position: "relative" }}
            />
            {/* Striped Texture */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.5) 5px, rgba(0,0,0,0.5) 10px)", opacity: 0.5 }} />
        </div>
        <motion.p 
            initial={{ opacity: 0.5 }} 
            animate={{ opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.85rem", letterSpacing: "0.5px" }}
        >
            Verifying On-Chain Data...
        </motion.p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// 3. COMPONENT: SPOTLIGHT CARD
// ============================================================================
function SpotlightCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        background: "#0a0814",
        padding: "40px",
        cursor: "default",
        textAlign: "left",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          opacity: opacity,
          transition: "opacity 0.3s",
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.25), transparent 40%)`,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "20px" }}>{icon}</div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "12px", color: "white" }}>
          {title}
        </h3>
        <p style={{ color: "#9ca3af", lineHeight: "1.6", fontSize: "0.95rem" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 4. COMPONENT: FAQ ITEM
// ============================================================================
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "24px 0",
          background: "transparent",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "1.1rem", fontWeight: "600", color: isOpen ? "white" : "#d1d5db" }}>
          {question}
        </span>
        <span style={{ color: isOpen ? "#7c3aed" : "white", transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ paddingBottom: "24px", color: "#9ca3af", lineHeight: "1.6" }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 5. COMPONENT: BLOG CARD
// ============================================================================
function BlogCard({ date, title, excerpt, link }: { date: string, title: string, excerpt: string, link: string }) {
  return (
    <div
      className="group"
      onClick={() => window.open(link, "_blank")}
      style={{
        cursor: "pointer",
        background: "#0e0c15",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.4)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6b7280", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
        {date}
      </div>
      <h3 style={{ fontSize: "1.4rem", fontWeight: "bold", lineHeight: "1.3", color: "white", marginBottom: "12px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "1rem", color: "#9ca3af", lineHeight: "1.6", marginBottom: "30px", flex: 1 }}>
        {excerpt}
      </p>
      <div style={{ color: "#a78bfa", fontWeight: "bold", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
        Continue Reading <span>→</span>
      </div>
    </div>
  );
}

// ============================================================================
// 6. MAIN LANDING PAGE
// ============================================================================
export default function Landing() {
  const router = useRouter(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ✅ NEW: Loading State for Scanner
  const [isLoading, setIsLoading] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ UPDATED: Trigger Scanner then Dashboard
  const handleConnect = () => {
      setIsLoading(true);
      setTimeout(() => {
          router.push("/dashboard");
      }, 3000);
  };

  return (
    <main
      className="landing"
      style={{
        minHeight: "100vh",
        background: "#05010d",
        color: "white",
        overflowX: "hidden",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ NEW: FUTURISTIC SCANNER OVERLAY */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* BACKGROUNDS */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/network-lines.svg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8) contrast(1.2) hue-rotate(240deg)",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.8,
          mixBlendMode: "screen",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "screen" }}
        >
          <source src="/globe.svg" type="video/mp4" />
          <source src="/globe.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-50%",
          width: "200%",
          height: "80%",
          backgroundImage: `linear-gradient(rgba(118, 60, 237, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(118, 60, 237, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          zIndex: 2,
          opacity: 0.6,
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ✅ RESTORED: TOP TICKER (No Airdrops/Signals) */}
      <div style={{ width: "100%", background: "rgba(15, 15, 14, 0.98)", position: "fixed", top: 0, left: 0, zIndex: 9999, borderBottom: "1px solid rgba(11, 11, 11, 0.93)", overflow: "hidden" }}>
        <div style={{ display: "inline-block", whiteSpace: "nowrap", padding: "8px 0", animation: "ticker 20s linear infinite", color: "#fff", fontSize: 13, fontWeight: "500" }}>
           No airdrops. No rewards. No eligibility. Informational use only. &nbsp;&nbsp;&nbsp;&nbsp; No airdrops. No rewards. No eligibility. Informational use only.
        </div>
      </div>

      {/* NAVBAR (Adjusted top position) */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          position: "fixed",
          top: "45px", // ✅ Adjusted for Ticker
          left: "50%",
          transform: "translateX(-50%)",
          width: "95%",
          maxWidth: "1200px",
          zIndex: 998,
          background: "rgba(10, 10, 10, 0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img 
            src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg" 
            alt="WalletConnect Logo" 
            style={{ height: '32px', width: 'auto' }} 
          />
          <span style={{ letterSpacing: "1px", color: "white" }}>REPUTATION</span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "30px", fontSize: "14px", color: "#e5e7eb", fontWeight: "500" }} className="nav-links">
          <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer", transition: "color 0.2s" }}>
            Home
          </span>
          <span onClick={() => scrollToSection("how-it-works")} style={{ cursor: "pointer", transition: "color 0.2s" }}>
            How it works
          </span>
          <span onClick={() => scrollToSection("faq")} style={{ cursor: "pointer", transition: "color 0.2s" }}>
            FAQ
          </span>
          <span onClick={() => scrollToSection("blog")} style={{ cursor: "pointer", transition: "color 0.2s" }}>
            Blogs
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                padding: "8px",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
              </svg>
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    width: "260px",
                    padding: "16px",
                    zIndex: 100,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "8px", cursor: "pointer" }} className="menu-item" onClick={handleConnect}>
                    <span style={{ fontSize: "20px" }}>📊</span>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>Reputation Score</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "8px", cursor: "pointer" }} className="menu-item" onClick={handleConnect}>
                    <span style={{ fontSize: "20px" }}>🛡️</span>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>Mint Pass</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={handleConnect}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: "rotate(45deg)" }}>
              <path d="M10 14L2 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M15 6l-3-3a1 1 0 0 0-1.42 0l-2 2L15 11l2-2a1 1 0 0 0 0-1.42l-2-1.58zM8 10L6 8a1 1 0 0 0-1.42 0l-1.58 2a1 1 0 0 0 0 1.42l3 3L8 10z" />
            </svg>{" "}
            Connect
          </button>
        </div>
      </nav>

      {/* WRAPPER FOR CONTENT */}
      <div style={{ flex: 1, marginTop: "80px" }}> 
      
      {/* HERO SECTION */}
      <section
        style={{
          textAlign: "center",
          padding: "100px 20px 140px",
          position: "relative",
          zIndex: 10,
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "4.5rem",
            fontWeight: "700",
            lineHeight: "1.1",
            marginBottom: "24px",
            background: "linear-gradient(to bottom, #ffffff 30%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          The Standard for On-Chain <br /> Reputation & Trust
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "1.2rem",
            color: "#e0e7ff",
            maxWidth: "750px",
            margin: "0 auto 50px",
            lineHeight: "1.6",
          }}
        >
          WalletConnect Reputation helps dApps verify real users and scale authentic communities. Prove you're human without exposing any sensitive data.
        </motion.p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button
            onClick={handleConnect}
            style={{
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              background: "#7c3aed",
              color: "white",
              cursor: "pointer",
            }}
          >
            📊 Check My Score
          </button>
          <button
            onClick={handleConnect}
            style={{
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(0,0,0,0.4)",
              color: "white",
              cursor: "pointer",
            }}
          >
            <span>🛡️</span> Mint Reputation Pass
          </button>
        </div>
      </section>

      {/* STATS STRIP */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(5, 1, 13, 0.6)",
          backdropFilter: "blur(10px)",
          padding: "40px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          <div>
            <h3 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>470+</h3>
            <p style={{ color: "#a5b4fc", margin: 0 }}>Transactions Analyzed</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>5</h3>
            <p style={{ color: "#a5b4fc", margin: 0 }}>Chains Supported</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>100%</h3>
            <p style={{ color: "#a5b4fc", margin: 0 }}>Privacy Preserved</p>
          </div>
        </div>
      </div>

      {/* WHO SHOULD USE + MARQUEE */}
      <section id="how-it-works" style={{ padding: "100px 20px", position: "relative", zIndex: 10 }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            background: "#0a0814",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Main Content Area */}
          <div style={{ padding: "60px 50px", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px", marginBottom: "60px" }}>
              <div>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: "1.2", marginBottom: "20px" }}>
                  Who should use <br /> <span style={{ color: "#a78bfa" }}>Reputation?</span>
                </h2>
              </div>
              <div style={{ color: "#d1d5db", fontSize: "1.1rem", lineHeight: "1.8" }}>
                <p>1. Users wanting to prove on-chain history without doxxing.</p>
                <p>2. dApps & Communities filtering for real humans, not bots.</p>
                <p>3. Builders who want secure identity verification without KYC.</p>
              </div>
            </div>
            <button
              onClick={handleConnect}
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                background: "#7c3aed",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Check Score ➜
            </button>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "16px",
                padding: "40px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "40px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div>
                <h3 style={{ fontSize: "4rem", fontWeight: "bold", color: "rgba(255,255,255,0.1)", margin: 0, lineHeight: 1 }}>01</h3>
                <h4 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Connect Wallet</h4>
                <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Securely connect your wallet. We read public history.</p>
              </div>
              <div>
                <h3 style={{ fontSize: "4rem", fontWeight: "bold", color: "rgba(255,255,255,0.1)", margin: 0, lineHeight: 1 }}>02</h3>
                <h4 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Analyze Behavior</h4>
                <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Engine checks transaction frequency & longevity.</p>
              </div>
              <div>
                <h3 style={{ fontSize: "4rem", fontWeight: "bold", color: "rgba(255,255,255,0.1)", margin: 0, lineHeight: 1 }}>03</h3>
                <h4 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Unlock Trust</h4>
                <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Use your score to access exclusive communities.</p>
              </div>
            </div>
          </div>

          {/* VERIFIED DATA MARQUEE */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.3)",
              padding: "20px 40px",
              display: "flex",
              alignItems: "center",
              gap: "30px",
              overflow: "hidden",
            }}
          >
            <span style={{ color: "#9ca3af", fontWeight: "600", whiteSpace: "nowrap", minWidth: "140px" }}>Verified data from:</span>
            <div style={{ display: "flex", overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                style={{ display: "flex", gap: "50px", whiteSpace: "nowrap", paddingRight: "50px" }}
              >
                {[...supportedChains, ...supportedChains].map((chain, i) => (
                  <span key={i} style={{ color: "white", fontWeight: "bold", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px", opacity: 0.8 }}>
                    <span style={{ color: "#7c3aed" }}>●</span> {chain}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" style={{ padding: "80px 20px 60px", position: "relative", zIndex: 10, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", transform: "translateY(-50%)", whiteSpace: "nowrap", zIndex: 0, pointerEvents: "none", opacity: 0.1 }}>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} style={{ display: "flex", gap: "40px" }}>
            <span style={{ fontSize: "120px", fontWeight: "bold", WebkitTextStroke: "1px white", color: "transparent" }}>
              REPUTATION SOLUTIONS &nbsp; REPUTATION SOLUTIONS
            </span>
          </motion.div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px", position: "relative", zIndex: 1 }}>
          <SpotlightCard
            icon={
              <div style={{ width: 60, height: 60, border: "2px solid #7c3aed", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", color: "white" }}>
                🛡️
              </div>
            }
            title="Proof of Reputation"
            description="Authenticate genuine users instantly with our Reputation API."
          />
          <SpotlightCard
            icon={
              <div style={{ width: 60, height: 60, border: "2px solid #7c3aed", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", color: "white" }}>
                🔗
              </div>
            }
            title="Wallet Analytics Suite"
            description="Leverage advanced on-chain clustering to classify wallets."
          />
        </div>
      </section>

      {/* DEVELOPERS */}
      <section id="developers" style={{ padding: "100px 20px", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "60px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "3rem", fontWeight: "bold", lineHeight: 1.1, marginBottom: "20px" }}>
              Built for Developers, <br /> Powered by Open APIs
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "30px" }}>
              WalletConnect Reputation is engineered to integrate seamlessly into your stack.
            </p>
            <a href="https://docs.walletconnect.network" target="_blank" style={{ color: "#a78bfa", fontWeight: "bold", textDecoration: "none", fontSize: "1.1rem", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Read docs to get started <span>→</span>
            </a>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              background: "radial-gradient(circle at center, #1e1b2e 0%, #05010d 100%)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 0 50px rgba(0,0,0,0.5)",
            }}
          >
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "2px",
                background: "linear-gradient(to right, transparent, #7c3aed, transparent)",
                boxShadow: "0 0 15px #7c3aed",
                zIndex: 10,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6], textShadow: ["0 0 20px rgba(124,58,237,0.3)", "0 0 50px rgba(124,58,237,0.8)", "0 0 20px rgba(124,58,237,0.3)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontSize: "100px", color: "#a78bfa", fontWeight: "300", fontFamily: "monospace" }}
            >
              {`</>`}
            </motion.div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px", fontWeight: "bold" }}>Frequently Asked Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <FAQItem
            question="What is WalletConnect Reputation?"
            answer="It is a read-only analytics system that evaluates how consistently and authentically a wallet interacts with decentralized applications."
          />
          <FAQItem
            question="Why choose this over KYC or generic scores?"
            answer="1. No personal data leaks.\n2. Focuses on behavior rather than wallet balance.\n3. Designed specifically for the WalletConnect ecosystem."
          />
          <FAQItem
            question="How can I improve my Reputation Score?"
            answer="Interact with diverse dApps, maintain consistent activity, and use WalletConnect-supported networks."
          />
          <FAQItem
            question="Is my data safe?"
            answer="Yes. This system is 100% read-only. We do not ask for signatures, permissions, or access to your funds."
          />
        </div>
      </section>

      {/* BLOGS */}
      <section id="blog" style={{ padding: "80px 20px 120px", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Latest Insights</h2>
          <span style={{ color: "#a78bfa", cursor: "pointer", fontWeight: "bold", fontSize: "1.1rem" }}>View all blogs →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          <BlogCard
            date="Sep 19, 2024"
            title="Introducing Reown: The new home for WalletConnect AppKit & WalletKit"
            excerpt="We are thrilled to announce Reown, a new company focused on UX-centric standards."
            link="https://walletconnect.network/blog/introducing-reown"
          />
          <BlogCard
            date="Nov 12, 2024"
            title="WalletConnect Certified: Setting a New Standard for Wallet UX"
            excerpt="A new certification program designed to ensure high-quality user experiences across the ecosystem."
            link="https://walletconnect.network/blog/walletconnect-certified"
          />
          <BlogCard
            date="Jan 10, 2025"
            title="Smart Accounts & Passkeys: The Future of Onboarding"
            excerpt="Exploring how account abstraction and passkeys are removing seed phrases and making Web3 accessible."
            link="https://walletconnect.network/blog"
          />
        </div>
      </section>

      </div> {/* END WRAPPER */}

      {/* FOOTER */}
      <footer
        style={{
          background: "#020105",
          padding: "80px 20px 40px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 10,
          marginTop: "auto",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontWeight: "bold", fontSize: "18px", marginBottom: "20px" }}>
              <img 
                src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg" 
                alt="WalletConnect Logo" 
                style={{ height: '32px', width: 'auto' }} 
              />
              <span>REPUTATION</span>
            </div>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: "1.6" }}>The standard for privacy-preserving on-chain reputation and trust.</p>
          </div>

          {/* Product Links (REAL) */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "20px", color: "white" }}>Product</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#9ca3af", fontSize: "0.9rem" }}>
              <a href="https://walletconnect.network" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Reputation Score
              </a>
              <a href="https://walletconnect.com/explorer" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Identity Pass
              </a>
              <a href="https://cloud.walletconnect.com" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Analytics
              </a>
              <a href="https://docs.walletconnect.com" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                API
              </a>
            </div>
          </div>

          {/* Resources Links (REAL) */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "20px", color: "white" }}>Resources</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#9ca3af", fontSize: "0.9rem" }}>
              <a href="https://docs.walletconnect.com" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Documentation
              </a>
              <a href="https://walletconnect.network/blog" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Case Studies
              </a>
              <a href="https://walletconnect.network/blog" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Blog
              </a>
              <a href="https://discord.gg/walletconnect" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Community
              </a>
            </div>
          </div>

          {/* Legal Links (REAL) */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "20px", color: "white" }}>Legal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#9ca3af", fontSize: "0.9rem" }}>
              <a href="https://walletconnect.com/privacy" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Privacy Policy
              </a>
              <a href="https://walletconnect.com/terms" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Terms of Service
              </a>
              <a href="https://walletconnect.com/cookie-policy" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "#9ca3af"}>
                Cookie Policy
              </a>
            </div>
          </div>

        </div>
        <div
          style={{
            maxWidth: "1200px",
            margin: "60px auto 0",
            padding: "20px 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.85rem",
          }}
        >
          © 2026 WalletConnect Reputation. All rights reserved.
        </div>
      </footer>

      {/* ✅ GLOBAL STYLES */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html,
        body {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background: #020105; /* Matches footer to hide gap */
          margin: 0 !important;
          padding: 0 !important;
        }
        .menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .group:hover h3 {
          color: #a78bfa;
          transition: color 0.3s;
        }
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          h1 {
            fontSize: 2.5rem !important;
          }
        }
      `}</style>
    </main>
  );
}