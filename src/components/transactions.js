import React, { useEffect, useState } from "react";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../constants/index";
import Web3 from "web3";
import { toHex } from "../utils";
import ReactPaginate from "react-paginate";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const currentPageData = transactions
    .slice(offset, offset + PER_PAGE)
    .sort()
    .map((transaction, index) => {
      return (
        <div
          key={index}
          className="flex  border-b items-center justify-center text-center text-[10px] md:text-xs  rounded-md"
        >
          <div className="w-1/4 cursor-default p-4 items-center justify-center truncate">
            {transaction.returnValues["1"]}
          </div>
          <a
            href={`${window.location.protocol}//${
              window.location.host
            }/t/${toHex(transaction.returnValues.linkId)}`}
            className="w-1/4 p-4 items-center justify-center truncate"
            target="_blank"
            rel="noreferrer"
          >
            {`${window.location.protocol}//${window.location.host}/t/${toHex(
              transaction.returnValues.linkId
            )}`}
          </a>
          <a
            href={`https://mumbai.polygonscan.com/block/${transaction.blockNumber}`}
            className="w-1/4 p-4 items-center justify-center"
            target="_blank"
            rel="noreferrer"
          >
            {transaction.blockNumber}
          </a>
          <a
            href={`https://mumbai.polygonscan.com/tx/${transaction.transactionHash}`}
            className="cursor-pointer w-1/4 p-4 items-center justify-center text-blue-300 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            View
          </a>
        </div>
      );
    });
  const pageCount = Math.ceil(transactions.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  async function getTransactions() {
    let web3 = new Web3(
      "https://polygon-mumbai.g.alchemy.com/v2/hxmQey4BoZrpBw85wfJCRinVg8HNg9uA"
    );
    let MyContract = new web3.eth.Contract(
      NFT_CONTRACT_ABI,
      NFT_CONTRACT_ADDRESS
    );
    MyContract.getPastEvents(
      "LinkAdded",
      {
        fromBlock: 0,
        toBlock: "latest",
      },
      function (error, events) {
        setTransactions(events);
      }
    );
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <div className="shadow-sm border-x shadow-grey-100">
        {currentPageData}
      </div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"flex text-gray-500 items-center justify-end"}
        previousLinkClassName={"px-2 hover:text-blue-300"}
        nextLinkClassName={"px-2 hover:text-blue-300"}
        disabledClassName={"text-gray-300"}
        activeClassName={"underline"}
        pageClassName={"px-1 hover:text-blue-300"}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        breakClassName={"text-gray-300"}
      />
    </div>
  );
};

export default Transactions;
