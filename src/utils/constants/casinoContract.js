import Vue from 'vue'
const address = process.env.contractAddress
const ABI = [
{
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "commit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "source",
        "type": "uint256"
      }
    ],
    "name": "Commit",
    "type": "event"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "increaseAmount",
        "type": "uint256"
      }
    ],
    "name": "increaseJackpot",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "betMask",
        "type": "uint256"
      },
      {
        "name": "modulo",
        "type": "uint256"
      },
      {
        "name": "commitLastBlock",
        "type": "uint256"
      },
      {
        "name": "commit",
        "type": "uint256"
      },
      {
        "name": "v",
        "type": "uint8"
      },
      {
        "name": "r",
        "type": "bytes32"
      },
      {
        "name": "s",
        "type": "bytes32"
      },
      {
        "name": "source",
        "type": "uint256"
      }
    ],
    "name": "placeBet",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "commit",
        "type": "uint256"
      }
    ],
    "name": "refundBet",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "newCroupier",
        "type": "address"
      }
    ],
    "name": "setCroupier",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "commit",
        "type": "uint256"
      }
    ],
    "name": "Payment",
    "type": "event"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "_maxProfit",
        "type": "uint128"
      }
    ],
    "name": "setMaxProfit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "commit",
        "type": "uint256"
      }
    ],
    "name": "FailedPayment",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "commit",
        "type": "uint256"
      }
    ],
    "name": "JackpotPayment",
    "type": "event"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "o",
        "type": "address"
      }
    ],
    "name": "setOwner1",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "o",
        "type": "address"
      }
    ],
    "name": "setOwner2",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "newSecretSigner",
        "type": "address"
      }
    ],
    "name": "setSecretSigner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "reveal",
        "type": "uint256"
      },
      {
        "name": "blockHash",
        "type": "bytes32"
      }
    ],
    "name": "settleBet",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [
      {
        "name": "beneficiary",
        "type": "address"
      },
      {
        "name": "withdrawAmount",
        "type": "uint256"
      }
    ],
    "name": "withdrawFunds",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
},
{
    "inputs": [
      {
        "name": "_owner1",
        "type": "address"
      },
      {
        "name": "_owner2",
        "type": "address"
      },
      {
        "name": "_secretSigner",
        "type": "address"
      },
      {
        "name": "_croupier",
        "type": "address"
      },
      {
        "name": "_maxProfit",
        "type": "uint128"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
},
{
    "constant": true,
    "inputs": [],
    "name": "croupier",
    "outputs": [
      {
        "name": "",
        "type": "address"
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
        "name": "commit",
        "type": "uint256"
      }
    ],
    "name": "getBetInfo",
    "outputs": [
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "modulo",
        "type": "uint8"
      },
      {
        "name": "rollUnder",
        "type": "uint8"
      },
      {
        "name": "placeBlockNumber",
        "type": "uint256"
      },
      {
        "name": "mask",
        "type": "uint256"
      },
      {
        "name": "gambler",
        "type": "address"
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
        "name": "reveal",
        "type": "uint256"
      }
    ],
    "name": "getBetInfoByReveal",
    "outputs": [
      {
        "name": "commit",
        "type": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "modulo",
        "type": "uint8"
      },
      {
        "name": "rollUnder",
        "type": "uint8"
      },
      {
        "name": "placeBlockNumber",
        "type": "uint256"
      },
      {
        "name": "mask",
        "type": "uint256"
      },
      {
        "name": "gambler",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "HOUSE_EDGE_MINIMUM_AMOUNT",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "HOUSE_EDGE_OF_TEN_THOUSAND",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "JACKPOT_FEE",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "JACKPOT_MODULO",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "jackpotSize",
    "outputs": [
      {
        "name": "",
        "type": "uint128"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "killed",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "lockedInBets",
    "outputs": [
      {
        "name": "",
        "type": "uint128"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "maxProfit",
    "outputs": [
      {
        "name": "",
        "type": "uint128"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "MIN_JACKPOT_BET",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "owner1",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "owner2",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "secretSigner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}
]

//const address = '0xe91d4f9c7ad5abc7c0d84c883fa7ff1ca95d33b6'
//const ABI = [
//{
//  "constant": false,
//  "inputs": [
//    {
//      "name": "_number",
//      "type": "uint256"
//    }
//  ],
//  "name": "bet",
//  "outputs": [],
//  "payable": true,
//  "stateMutability": "payable",
//  "type": "function"
//},
//{
//  "constant": false,
//  "inputs": [],
//  "name": "kill",
//  "outputs": [],
//  "payable": false,
//  "stateMutability": "nonpayable",
//  "type": "function"
//},
//{
//  "anonymous": false,
//  "inputs": [
//    {
//      "indexed": false,
//      "name": "_status",
//      "type": "bool"
//    },
//    {
//      "indexed": false,
//      "name": "_amount",
//      "type": "uint256"
//    }
//  ],
//  "name": "Won",
//  "type": "event"
//},
//{
//  "payable": false,
//  "stateMutability": "nonpayable",
//  "type": "fallback"
//},
//{
//  "inputs": [
//    {
//      "name": "_minBet",
//      "type": "uint256"
//    },
//    {
//      "name": "_houseEdge",
//      "type": "uint256"
//    }
//  ],
//  "payable": true,
//  "stateMutability": "payable",
//  "type": "constructor"
//},
//{
//  "constant": true,
//  "inputs": [],
//  "name": "checkContractBalance",
//  "outputs": [
//    {
//      "name": "",
//      "type": "uint256"
//    }
//  ],
//  "payable": false,
//  "stateMutability": "view",
//  "type": "function"
//}
//]
export {address, ABI}