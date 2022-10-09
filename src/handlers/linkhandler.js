import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants/index";
import { ethers } from "ethers";

async function initializeContract(library) {
  return new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, library);
}

export const convertLink = async (library, url, setLink, setLoading) => {
  let contract = await initializeContract(library.getSigner());
  let tx = await contract.createNewLink(url);
  console.log(tx.hash);
  contract.on("LinkAdded", async (linkId, linkUrl) => {
    setLink(linkId.toHexString());
    setLoading(false);
    if (linkUrl !== url) {
      return console.log("NOT MY EVENT");
    }
    return;
  });
};

export const GetLink = async (library, linkId) => {
  let contract = await initializeContract(library);
  let link = await contract.getLink(linkId);
  return link;
};
