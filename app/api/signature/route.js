import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function POST(request) {
  try {
    const { userAddress, score } = await request.json();

    // 1. Check karo data aya ya nahi
    if (!userAddress || !score) {
      return NextResponse.json({ error: "Data missing" }, { status: 400 });
    }

    // 2. Owner Wallet Setup karo (Private Key se)
    // Ye wohi wallet hona chahiye jo Contract main "Signer" hai
    const privateKey = process.env.SIGNER_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);

    // 3. Hash banao (Bilkul wese jese Smart Contract main hai)
    // keccak256(abi.encodePacked(user, score))
    const messageHash = ethers.solidityPackedKeccak256(
      ["address", "uint256"],
      [userAddress, score]
    );

    // 4. Sign karo (Magic happens here ✍️)
    // Ye signature Contract ke 'verifySignature' ko pass karega
    const signature = await wallet.signMessage(ethers.getBytes(messageHash));

    return NextResponse.json({ signature });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}