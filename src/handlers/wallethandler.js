import { ethers } from "ethers";
import { toHex } from "../utils";

export const connectWallets = async (
  setLibrary,
  setChainId,
  setWeb3Provider,
  web3modal,
  toast
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

    setChainId(chainId);
    if (chainId !== 80001) {
      toast("Please switch to the Mumbai network");
      throw new Error("Incorrect network");
    }
    return library;
  } catch (error) {
    console.log(error);
  }
};

export const switchNetwork = async (library, setChainId) => {
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(80001) }],
    });
    setChainId(80001);
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await library.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: toHex(80001),
              chainName: "Polygon Mumbai test",
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
              nativeCurrency: {
                decimals: 18,
                symbol: "MATIC",
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com"],
            },
          ],
        });
        setChainId(80001);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
