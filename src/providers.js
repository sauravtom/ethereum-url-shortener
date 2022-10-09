import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "TQR.LOL",
      rpc: {
        80001: "https://rpc-mumbai.maticvigil.com",
      },
      chainId: 80001,
    },
  },
};
