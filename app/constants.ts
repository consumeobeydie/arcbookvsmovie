export const CONTRACT_ADDRESS = "0x68f64B8c0c01b559A669AD57eA450457c543EE8e";

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
    stateMutability: "payable",
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