import { NextResponse } from "next/server";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY; 

const CHAINS = {
  ethereum: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  polygon: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  optimism: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  base: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
};

export async function POST(req: Request) {
  try {
    const { address, isWalletConnected } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "No address provided" }, { status: 400 });
    }

    console.log(`\n🔍 STRICT SCANNING ADDRESS: ${address}`);

    const promises = Object.entries(CHAINS).map(async ([chainName, url]) => {
      try {
        let categories = ["external", "erc20", "erc721", "erc1155"];
        if (chainName === "ethereum" || chainName === "polygon") {
            categories.push("internal");
        }

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: [{
              fromBlock: "0x0",
              fromAddress: address,
              category: categories,
              maxCount: "0x3E8"
            }]
          }),
        });

        const data = await response.json();
        if (data.error) return { chainName, count: 0, transactions: [], error: true };

        const transfers = data.result?.transfers || [];
        return { chainName, count: transfers.length, transactions: transfers, error: false };

      } catch (err) {
        return { chainName, count: 0, transactions: [], error: true };
      }
    });

    const results = await Promise.all(promises);

    // --- AGGREGATION ---
    let totalTransactions = 0;
    const chainCounts: Record<string, any> = {};
    let allActivity: any[] = [];
    const uniqueInteractions = new Set<string>();

    results.forEach(res => {
        totalTransactions += res.count;
        chainCounts[res.chainName] = { transactions: res.count };
        if (res.transactions) {
            allActivity.push(...res.transactions);
            res.transactions.forEach((tx: any) => {
                if (tx.to) uniqueInteractions.add(tx.to);
            });
        }
    });

    const activeChains = Object.values(chainCounts).filter((c: any) => c.transactions > 0).length;
    const contractsCount = uniqueInteractions.size;

    // =========================================================
    // 🚨 STRICT SCORING LOGIC (UPDATED) 🚨
    // Target: Normal (40-60), Pro (60-80), Peak (80-100)
    // =========================================================
    
    let score = 0;
    const badges: string[] = [];

    // 1. BASE SCORE (For connecting) -> 10 Points
    if (isWalletConnected) score += 10;

    // 2. VOLUME (Strict Tiers) -> Max 30 Points
    // Normal users usually have < 50 txs.
    if (totalTransactions >= 500) { score += 30; badges.push("Whale 🐳"); }
    else if (totalTransactions >= 100) { score += 20; badges.push("Power User ⚡"); }
    else if (totalTransactions >= 20) { score += 10; } // Basic User

    // 3. CONTRACT INTERACTIONS (The "Real Use" Check) -> Max 20 Points
    // Just sending money isn't enough. Did they use Apps/Swap/DeFi?
    if (contractsCount >= 50) { score += 20; badges.push("DeFi Pro 💸"); }
    else if (contractsCount >= 10) { score += 10; } // Swapper/Normal User

    // 4. CHAIN DIVERSITY (Multichain) -> Max 20 Points
    if (activeChains >= 5) { score += 20; badges.push("Chain Nomad 🌐"); }
    else if (activeChains >= 3) { score += 10; badges.push("Multi-Chain ⛓️"); }

    // 5. BUILDER / DEVELOPER (The Hardest Part) -> Max 20 Points
    // Did they actually DEPLOY a contract?
    const deployments = allActivity.filter(tx => tx.to === null).length;
    if (deployments > 0) {
        score += 20; 
        badges.push("Builder 🛠️"); 
    } else {
        // Bonus for NFT collecting if NOT a builder
        if (allActivity.some(tx => tx.category === 'erc721')) {
            score += 5;
            badges.push("NFT Collector 🎨");
        }
    }

    // =========================================================

    return NextResponse.json({
      score: Math.min(score, 100), // Cap at 100
      stats: {
        totalTransactions,
        activeChains,
        chainsBreakdown: chainCounts,
        contractsDeployed: contractsCount // Returns Unique Contracts
      },
      badges,
    });

  } catch (e: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
