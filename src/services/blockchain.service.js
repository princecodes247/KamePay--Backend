const User = require("./../models/user.model");
const CustomError = require("./../utils/custom-error");
const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://eth-rinkeby.alchemyapi.io/v2/MCv-KDVuqfpEhd6IcfzssNUM-uQFYpJt"
  )
);
class BlockchainService {
  async createAddress() {
    const account = web3.eth.accounts.create();
    const address = account.address;
    const privateKey = account.privateKey;
    console.log(address);
    return { address, privateKey };
  }

  async getBalance(address) {
    const balance = web3.eth.getBalance(address);
    console.log(balance, "BlockchainService.getBalance");
    return balance;
  }
}

module.exports = new BlockchainService();
