# 💼 TradeMan – The Ground-Level Stock Market

TradeMan is a ground-level stock market where cafés, shops, and local businesses raise capital by offering partial ownership directly to investors.
It’s not just another Web3 DeFi app — it’s a revolution in local investing, built to empower tier-2 economies that form the backbone of the Indian economy.

📍 **Think of it as investing in the real economy — right from your street.
**
🚨 **The Problem**

Small businesses power our communities but struggle to scale due to lack of flexible funding.
Traditional loans are rigid. Crowdfunding is chaotic. VCs don’t look down this far.
At the same time, traders and investors want real-world ROI and community-driven assets.

🧠** The Solution: TradeMan**

TradeMan lets trusted businesses tokenize a portion of their ownership (less than 100% to prevent small business to loss there ownership) and raise funds from local or global investors.
🪙 These tokens represent:
           
           📈 Equity-like ownership
           💰 Real profit-sharing (dividends)
           🔒 Transparent smart contracts

🔥** Key Features**

Featur Description

    🏪 Local Business Listing	                                                                      Cafés, grocery stores, salons & more list % ownership
    🧾 Tokenized Shares	                                                                            Businesses can offer up to 70% stake as ERC-20 tokens
    💸 Investor Dashboard	                                                                          Track ROI, dividends, and trading opportunities
    🔁 Smart Contract Payouts                                                                      	Dividends are distributed automatically on-chain
    🛡️ Founder Ownership Locked                                                                   	Founders can't lose 100% — capped at 70% ownership
    🌍 Open, Trustless & Scalable                                                                  	All records live on Ethereum testnet (Sepolia)

💡 Why "Ground-Level Stock Market"?
🌱 TradeMan isn’t built for startups.
🏪 It’s built for businesses with roots — the neighborhood café, the local grocery chain, the family-run salon.

🧱** Tech Stack**
Layer Stack

    🔗 Blockchain	                                                Ethereum (Sepolia Testnet)
    📜 Contracts                                                 	Solidity (ERC-20 token standard)
    🖥 Backend	                                                  Node.js + Express
    🔐 Wallets                                                  	MetaMask + Web3Auth (optional)
    📊 Database                                                 	Firebase (for profiles & analytics)
    🧩 Frontend	                                                  FlutterFlow 

⚙️ **How It Works**

    Business creates listing                – defines % of ownership to tokenize (e.g., 60%)
    Smart contract deployed                 – tokens minted and locked with cap rules
    Investors buy tokens                    – tracked on-chain via MetaMask or wallet
    Business grows                          – shares profit via dividend payout
    Investors earn                          – passive income, and trade their shares

**Current Progress**

                       1. Smart contracts tested and deployed
                          on sepolia testnet you can check the address.
                       2. Backend server live
                       3. Routes set
                       4. Frontend soon
Demo video at: https://youtu.be/N1w-FB8RwOc?si=ADjKgz0-QVnWhZl2 (web version)
🚀 **Why TradeMan?**

India's tier-2 cities and towns are full of profitable, trusted businesses that can grow — if they get the right funding.

💡 TradeMan allows these businesses to:
                    Tokenize up to 70% of their ownership
                    Raise capital directly from investors
                    Share profits transparently via smart contracts
                    Investors, in turn, get:
                    Real-world ROI
                    Equity-style ownership
                    Passive income through dividends

## 🛠 Smart Contracts

- `ShareToken.sol`: ERC-20 token representing platform currency or share value
- `BricksToken.sol`: ERC-20 token representing business equity with ownership and minting logic
- `Marketplace.sol`: Manages listing and trading of ShareTokens between users

## 🌐 Deployed Contracts (Sepolia Testnet)

- **Deployer Wallet**: `0x91942914d635364bF79fd8326dB7D30c3c8E37B8`
- **ShareToken**: `0xB510b1A90Fc3A34d1B464D69ad94448de7924ab5`
- **BricksToken**: `0x0C6E2eB7c8761D5103F744E09c832c68cCBd10f9`
- **Marketplace**: `0xE474A6F728F8eE2D22a686eC52135d21b7AD99Bd`

> You can explore these contracts on [Sepolia Etherscan](https://sepolia.etherscan.io/) using the above addresses.

## 🔧 How to Run Locally

```bash
git clone https://github.com/thebuildercore/TradeMan.git
cd TradeMan
npm install
npx hardhat test

