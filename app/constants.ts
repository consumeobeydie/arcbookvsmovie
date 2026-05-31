export const CONTRACT_ADDRESS = "BURAYA_SOZLESME_ADRESINI_YAZ";

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
  {
    name: "vote",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "workId", type: "uint8" },
      { name: "isFilm", type: "bool" },
    ],
    outputs: [],
  },
  {
    name: "getResults",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "workId", type: "uint8" }],
    outputs: [
      { name: "name", type: "string" },
      { name: "book", type: "uint256" },
      { name: "film", type: "uint256" },
    ],
  },
  {
    name: "getAllResults",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "names", type: "string[20]" },
      { name: "book", type: "uint256[20]" },
      { name: "film", type: "uint256[20]" },
    ],
  },
  {
    name: "hasVoted",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "voter", type: "address" },
      { name: "workId", type: "uint8" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;