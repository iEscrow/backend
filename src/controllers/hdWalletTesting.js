const infuraEndpoint = "https://mainnet.infura.io/v3/db628a40015a42789cb0cb44b68829bf"

const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(infuraEndpoint)
const address = "0x388c818ca8b9251b393131c08a736a67ccb19297"

const createEtherWallet = async () => {
  const wallet = ethers.Wallet.createRandom()
  return wallet
}

module.exports = createEtherWallet



/* const balance = await provider.getBalance(wallet.address)
  console.log(ethers.utils.formatEther(balance))
  console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
console.log('Public Key:', wallet.publicKey); */