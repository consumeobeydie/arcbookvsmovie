export const CONTRACT_ADDRESS = "0x3a33bF31930FB32eEAd6e2D6e02c8984b5cB1095";

export const USDC_ADDRESS = "0x3600000000000000000000000000000000000000";

export const ARC_TESTNET = {
  id: 5042002,
  name: "Arc Network Testnet",
  network: "arc-testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.arc.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: "https://testnet.arcscan.app",
    },
  },
};

export const CONTRACT_ABI = [
  "function vote(uint8 workId, bool isFilm) external",
  "function getResults(uint8 workId) external view returns (string memory name, uint256 book, uint256 film)",
  "function getAllResults() external view returns (string[20] memory names, uint256[20] memory book, uint256[20] memory film)",
  "function hasVoted(address voter, uint8 workId) external view returns (bool)",
];