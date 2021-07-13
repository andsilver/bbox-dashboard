import axios from 'axios';
import { config } from '../../../config';

const instance = axios.create({
  params: {
    apikey: config.bscApiKey
  },
  baseURL: 'https://api.bscscan.com/api'
});

export const getRecentTransactions = (address, blocks = 20) => {
  return instance.get('', {
    params: {
      module: 'account',
      action: 'tokentx',
      sort: 'desc',
      page: 1,
      offset: blocks,
      contractaddress: config.contractAddress,
      address: config.lotteryWalletAddress
    }
  });
};
