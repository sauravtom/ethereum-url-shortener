var contract;

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
})

$(".close").click(function() {
   $(".modal").removeClass("is-active");
});

function detectWeb3(){
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3 = new Web3(web3.currentProvider);
    } else {
        $(".modal").addClass("is-active");
        console.log('METAMASK NOT DETECTED');
    }
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
    let address = "0x4b8241f24537d2539d0b310bc074fd68a782e182";
    let abi = [
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
        var shortUrl = '{0}/?id={1}'.f(window.location.origin, linkId.toNumber())
        $("#info").prepend( "Short URL: <a target='_blank' href='{0}'>{0}</a><br>".f(shortUrl) );
        console.log("EVENT LISTENER", shortUrl, linkId.toNumber(), linkUrl);
        $("#spinner").hide();
        $('#generate').prop('disabled', false);
    });
}