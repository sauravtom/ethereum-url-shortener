var contract;
var address;
var abi;

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

$(document).ready(function() {
    $("#spinner").hide();
    detectWeb3();
    initContract();
    checkNetwork();
    batchEvents(abi, address);
})

$(".close").click(function() {
   $(".modal").removeClass("is-active");
});

$(".recent-btn").click(function() {
   $(".transactions-modal").addClass("is-active");
});

function detectWeb3(){
    window.ethereum.enable();
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3 = new Web3(web3.currentProvider);
    } else {
        $(".metamask-modal").addClass("is-active");
        console.log('METAMASK NOT DETECTED');
    }
}

function checkNetwork(){
    console.log('CHECKING NETWORK');

    contract.getLink(1)
    .then((output) => {
      console.log('OUTPUT',output);
    })
    .catch((err) => {
        console.log('ERROR',err);
        $(".metamask-network-modal").addClass("is-active");
    });
    
}

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

function initContract() {
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);
    address = "0x4b8241f24537d2539d0b310bc074fd68a782e182";
    abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "url",
                    "type": "string"
                }
            ],
            "name": "createNewLink",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "Log",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "linkId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "url",
                    "type": "string"
                }
            ],
            "name": "LinkAdded",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "linkId",
                    "type": "uint256"
                }
            ],
            "name": "getLink",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "linkMapping",
            "outputs": [
                {
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "name": "url",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
    contract = new ethers.Contract(address, abi, provider.getSigner());
    console.log('e0x Contract Initiated');
}

function batchEvents(abi, address) {
    //batch listening of events
    MyContract = web3.eth.contract(abi);
    myContractInstance = MyContract.at(address);
    events = myContractInstance.allEvents({event: 'LinkAdded', fromBlock: 0, toBlock: 'latest'});
    
    events.watch(function(error, result){
      console.log(result);
      //console.log(result.args.url, result.args.linkId.toNumber(), result.blockNumber, result.transactionHash);
      
      var shortUrl = '{0}/s?id={1}'.f(window.location.origin, result.args.linkId.toNumber());
      var shorterUrl = shortUrl.replace('https://','');
      var shorterUrl = shorterUrl.replace('http://','');
      var row = "\
        <tr>\
          <td><p class='smaller'>{0}</p></td>\
          <td style='min-width:133px'><a class='small' target='_blank' href='{1}'><strong>{2}</strong></a></td>\
          <td><a target='_blank' href='https://ropsten.etherscan.io/block/{3}'><code>{3}</code></a></td>\
          <td><a target='_blank' href='https://ropsten.etherscan.io/tx/{4}'>link</a></td>\
        </tr>".f(result.args.url,shortUrl,shorterUrl,result.blockNumber,result.transactionHash);
        //console.log(row);
        $("#tx-table").prepend(row);
    });
}

async function shorten() {
    detectWeb3();
    url = document.getElementById("url").value;
    if(!url){
      return window.alert("URL VALUE IS EMPTY");
    }
    if(!isValidUrl(url)){
      return window.alert("INVALID URL");
    }
    $("#info").html(""); 
    $("#spinner").show();
    $('#generate').prop('disabled', true);
    tx = await contract.createNewLink(url);
    console.log(tx.hash);

    $("#info").prepend( "<p>waiting for transaction to be mined</p><br>" );

    contract.on("LinkAdded", (linkId, linkUrl) => {
        if(linkUrl !== url){
            console.log('NOT MY EVENT');
            return
        }
        $("#info").html( "<p>transaction confirmed</p> <a target='_blank' href='https://ropsten.etherscan.io/tx/{0}'>view tx on blockchain</a><br>".f(tx.hash) );
        var shortUrl = '{0}/s?id={1}'.f(window.location.origin, linkId.toNumber());
        $("#info").prepend( "Short URL: <a target='_blank' href='{0}'>{0}</a><br>".f(shortUrl) );
        console.log("EVENT LISTENER", shortUrl, linkId.toNumber(), linkUrl);
        $("#spinner").hide();
        $('#generate').prop('disabled', false);
    });
}
