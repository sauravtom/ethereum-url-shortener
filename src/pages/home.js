import React, { useState } from "react";
import "../App.css";
import { AiFillGithub } from "react-icons/ai";
import styles from "../styles/home.module.css";
import Wallet from "../components/wallet";
import { convertLink } from "../handlers/linkhandler";
import Transactions from "../components/transactions";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [url, setUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [loading, setLoading] = useState(false);
  const [library, setLibrary] = useState();
  const [connectedChain, setConnectedChain] = useState("");

  async function initContract() {
    if (!library) {
      toast("Please connect wallet first");
      return;
    }
    if (library && connectedChain !== 137) {
      toast("Please switch to the Polygon Mainnet network");
      return;
    }
    setLoading(true);
    await convertLink(library, url, setLinkId, setLoading);
  }

  function copyLink() {
    toast("Link copied to clipboard");
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/t/${linkId}`
    );
  }

  return (
    <div>
      <Toaster />
      <div className=" relative">
        <div className="flex w-full  items-center p-5">
          <div className="w-1/2 text-[20px] font-[600] ">
            <div className="w-2/5 lg:w-1/5">
              <img src="https://i.imgur.com/CC6SXSJ.png" alt="" />
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex w-full justify-end items-center">
              <div className="pl-10">
                <Wallet
                  library={library}
                  setLibrary={setLibrary}
                  setConnectedChain={setConnectedChain}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 m-auto pt-20">
          <div className="font-[800] text-[40px] lg:text-[50px]  text-center">
            <span>URL Shortner</span>
          </div>
        </div>
        <div className="font-[400] text-[16px] md:text-[16px]  text-center text-[#555555]">
          <span>
            Powered by
            <span className={styles.poly}> Polygon</span> Blockchain
          </span>
        </div>
      </div>
      <div className="flex w-full md:w-4/5 lg:w-3/5 mt-12 mx-auto items-center justify-center relative">
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="Long URL"
          className="px-2 box-border outline-0 py-2 shadow-md shadow-grey-300 rounded-md w-8/12 border mr-2"
        />
        <button
          onClick={initContract}
          className="px-2 box-border py-2  shadow-md shadow-blue-100 rounded-md border  text-white w-3/12 md:w-2/12 lg:w-2/12
           bg-black hover:bg-blue-400 "
        >
          Go
        </button>
      </div>
      <div className="flex justify-center items-center my-8">
        {loading && (
          <div role="status">
            <svg
              className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-blue-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
        {linkId && (
          <div className="flex text-xs md:text-base px-2 flex-col md:flex-row items-center">
            <div className="my-1 flex items-center space-x-4">
              Short URL:{" "}
              <span className="ml-1">{`${window.location.protocol}//${window.location.host}/t/${linkId}`}</span>
              <button
                onClick={copyLink}
                className="hover:bg-blue-500 hover:text-white ml-4 border px-2 py-1 rounded-md"
              >
                Copy Link
              </button>
            </div>
            <div className="my-1 md:my-0 md:ml-4 flex items-center space-x-4">
              <QRCode
                size={120}
                value={`${window.location.protocol}//${window.location.host}/t/${linkId}`}
              />
            </div>
          </div>
        )}
      </div>
      <div className=" mt-24 w-full lg:w-2/3 m-auto">
        <div className=" my-12 w-full md:w-2/3 mx-auto">
          <div className="font-[600] text-[16px] md:text-[24px]  text-center text-[#555555]">
            Recently Shortened URLs
          </div>
          <div className=" flex mt-4 items-center justify-center text-center bg-[#f5f7f8]  rounded-t-lg text-[10px] md:text-[14px] font-light ">
            <div className="w-1/3 p-4 items-center justify-center">
              Long URL
            </div>
            <div className="w-1/3 p-4 items-center justify-center">
              Short URL
            </div>

            <div className="w-1/3 p-4 items-center justify-center">
              View On Polygonscan
            </div>
          </div>
          <div>
            <Transactions />
          </div>
        </div>
      </div>
      <div className="mb-4 space-x-4 flex text-gray-600 justify-center items-center">
        <div>
          <a
            href="https://hackernoon.com/making-a-decentralized-url-shortener-using-ethereum-4fdfccf712a6"
            target="_blank"
            rel="noreferrer"
            className="hover:underline cursor-pointer"
          >
            How it works
          </a>
        </div>
        <div>
          <a
            href="https://github.com/sauravtom/ethereum-url-shortener/tree/2022"
            target="_blank"
            rel="noreferrer"
            className="hover:underline cursor-pointer flex justify-center items-center"
          >
            <AiFillGithub />
            <span className="pl-1 ">Github</span>
          </a>
        </div>
      </div>
      <div className="mb-2 space-x-4 flex text-gray-500 justify-center items-center">
        <a
          href="https://metalink.so"
          target="_blank"
          rel="noreferrer"
          className="hover:underline cursor-pointer flex justify-center items-center"
        >
          Made with ❤️ by Metalink
        </a>
      </div>
    </div>
  );
};

export default Home;
