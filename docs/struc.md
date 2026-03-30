TradeMan/
├── README.md                  
├── pitch-deck.pdf             
├── demo-video-link.txt        
├── contracts/                 
│   ├── hardhat.config.ts         <-- Your opBNB/BSC TypeScript configuration
│   ├── contracts/             
│   │   ├── core/              
│   │   │   ├── AssetIssuer.sol   <-- The factory that deploys a new local business listing
│   │   │   └── EquityToken.sol   <-- The BEP-20 token enforcing the 70% public / 30% founder cap
│   │   ├── vault/             
│   │   │   └── DividendVault.sol <-- Receives the stablecoin "fiat" and splits it among holders
│   │   ├── mocks/             
│   │   │   ├── MockUSDT.sol          
│   │   │   └── MockFiatOracle.sol    
│   │   └── compliance/        
│   │       └── MockZKVerifier.sol    
│   ├── scripts/               
│   │   ├── 01_deploy_issuer.ts       
│   │   ├── 02_deploy_mocks.ts        
│   │   └── 03_simulate_revenue.ts    
│   └── test/                  
│       └── TradeManFlow.test.ts      
└── frontend/                  
    ├── package.json           
    ├── next.config.mjs         
    ├── src/                   
    │   ├── app/               
    │   ├── components/        
    │   └── hooks/