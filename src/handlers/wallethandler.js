import { ethers } from "ethers";
import { toHex } from "../utils";

export const connectWallets = async (
  setLibrary,
  setChainId,
  setWeb3Provider,
  web3modal,
  toast,
  setConnectedChain
) => {
  try {
    const web3ModalInstance = await web3modal.connect();
    const library = new ethers.providers.Web3Provider(web3ModalInstance);
    setLibrary(library);

    const web3ModalProvider = new ethers.providers.Web3Provider(
      web3ModalInstance
    );
    if (web3ModalProvider) {
      setWeb3Provider(web3ModalProvider);
    }
    const { chainId } = await web3ModalProvider.getNetwork();
    setConnectedChain(chainId);
    setChainId(chainId);
    if (chainId !== 137) {
      toast("Please switch to the Mumbai network");
      throw new Error("Incorrect network");
    }
    return library;
  } catch (error) {
    console.log(error);
  }
};

export const switchNetwork = async (library, setChainId, setConnectedChain) => {
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(137) }],
    });
    setChainId(137);
    setConnectedChain(137);
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await library.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: toHex(137),
              chainName: "Polygon Mainnet",
              rpcUrls: ["https://polygon-rpc.com"],
              nativeCurrency: {
                decimals: 18,
                symbol: "MATIC",
              },
              blockExplorerUrls: ["https://polygonscan.com"],
            },
          ],
        });
        setChainId(137);
        setConnectedChain(137);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
