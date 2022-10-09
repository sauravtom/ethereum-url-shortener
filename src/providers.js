import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "TinyQR",
      rpc: {
        80001: "https://rpc-mumbai.maticvigil.com",
      },
      chainId: 80001,
    },
  },
};
