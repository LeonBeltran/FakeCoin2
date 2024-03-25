import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as env from 'dotenv';
env.config();

const {DEFAULT_PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  gasReporter: {
    enabled: true,
  },
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: '100000000000000000000'
      }
    },
    "arbitrum-sepolia": {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: [`${DEFAULT_PRIVATE_KEY}`],
      chainId: 421614
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY ?? "",
    customChains: [
      {
        network: "arbitrum-sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  }
};

export default config;