export const NFT_CONTRACT_ADDRESS =
  "0x3AED03bB42fC73609d80aB034e5dB423D7b212Aa";

export const NFT_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "url",
        type: "string",
      },
    ],
    name: "createNewLink",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "linkId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "url",
        type: "string",
      },
    ],
    name: "LinkAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "Log",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "linkId",
        type: "uint256",
      },
    ],
    name: "getLink",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "linkMapping",
    outputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "url",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
