import React, { useState } from "react";
import Web3Modal from "web3modal";
import { connectWallets, switchNetwork } from "../handlers/wallethandler";
import { providerOptions } from "../providers";
import toast, { Toaster } from "react-hot-toast";

const Wallet = ({ library, setLibrary, setConnectedChain }) => {
  const [web3Provider, setWeb3Provider] = useState(null);

  const [chainId, setChainId] = useState("");
  const web3modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

  const connectWallet = async () => {
    try {
      await connectWallets(
        setLibrary,
        setChainId,
        setWeb3Provider,
        web3modal,
        toast,
        setConnectedChain
      );
    } catch (error) {
      console.log(error);
    }
  };

  const refreshState = () => {
    setChainId();
    setConnectedChain();
    setWeb3Provider(null);
  };

  const disconnect = async () => {
    await web3modal.clearCachedProvider();
    refreshState();
  };

  return (
    <div>
      <Toaster />

      {web3Provider === null ? (
        <button
          onClick={connectWallet}
          className="hover:bg-black hover:text-white flex items-center text-xs md:text-base justify-center border border-black rounded-full py-3 px-4"
        >
          <div className="p-1 bg-red-400 rounded-full mr-2"></div>
          Connect Wallet
        </button>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row md:space-y-0 space-y-2">
            {chainId === 137 && (
              <button
                onClick={() => switchNetwork(library, setChainId)}
                className="hover:bg-black hover:text-white flex items-center justify-center border border-black rounded-full py-3 px-4"
              >
                <div className="p-1 bg-green-400 rounded-full mr-2"></div>
                <p className="truncate w-[120px]">
                  {web3Provider.provider.selectedAddress}
                </p>
              </button>
            )}

            <div className="flex items-center justify-center">
              {chainId !== 137 && (
                <button
                  onClick={() =>
                    switchNetwork(library, setChainId, setConnectedChain)
                  }
                  className="hover:bg-black hover:text-white flex items-center justify-center border border-black rounded-full py-3 px-4"
                >
                  <div className="p-1 bg-red-400 rounded-full mr-2"></div>
                  Switch Network
                </button>
              )}
              <div className="pl-2">
                <button
                  onClick={disconnect}
                  className="hover:bg-black hover:text-white flex items-center justify-center border border-black rounded-full py-3 px-4 "
                >
                  <div className=" p-1 bg-red-400 rounded-full mr-2"></div>
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
