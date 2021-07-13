import Web3 from 'web3';
import abi from '../../../abi.json';
import { config } from '../../../config';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
export const contract = new web3.eth.Contract(abi, config.contractAddress);

export const getBBoxTaxAllocation = () =>
  contract.methods
    .BBOXTaxAlloc()
    .call()
    .then(res => res / 2);
export const getBBoxCapacity = () => contract.methods.BBOXcapacity().call();
export const getBBoxPoolAdds = () => contract.methods.getBBOXPoolAdds().call();
export const getBBoxHolderTaxAlloc = () =>
  contract.methods
    .holderTaxAlloc()
    .call()
    .then(res => res / 2);
export const getBBoxBuyThresh = () => contract.methods.buyThresh().call();

export const getJackpotBalance = () => web3.eth.getBalance(config.lotteryWalletAddress);
