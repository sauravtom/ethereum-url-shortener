import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "TinyQR",
      rpc: {
        137: "https://rpc-mumbai.maticvigil.com",
      },
      chainId: 137,
    },
  },
};
