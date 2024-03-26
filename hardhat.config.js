require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const FORK_FUJI = false;
const FORK_MAINNET = false;
let forkingData = undefined;

if (FORK_MAINNET) {
  forkingData = {
    url: "https://api.avax.network/ext/bc/C/rpcc",
  };
}
if (FORK_FUJI) {
  forkingData = {
    url: "https://api.avax-test.network/ext/bc/C/rpc",
  };
}


customChains: [
  {
    network: "snowtrace",
    chainId: 43113,
    urls: {
      apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
      browserURL: "https://testnet.snowtrace.io"
    }
  }
]


module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      chainId: !forkingData ? 43112 : undefined, //Only specify a chainId if we are not forking
      forking: forkingData,
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: ["db5fe2ba2c4dcaac9865ce50cccba7ddd89fa10efdb5a66cb4893d1c675dc6d9"], // Replace with your wallet's private key
    },
    mainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: ["db5fe2ba2c4dcaac9865ce50cccba7ddd89fa10efdb5a66cb4893d1c675dc6d9"], // Replace with your wallet's private key
    },
  },
  etherscan: {
    apiKey: {
      snowtrace: "B1BMK6TMV24A1JY1CCQRFEMTIN19FYQ9W7", // apiKey is not required, just set a placeholder
    },
  }
};
