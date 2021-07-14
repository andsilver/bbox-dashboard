import axios from 'axios';
import { config } from '../../../config';

const instance = axios.create({
  params: {
    apikey: config.bscApiKey
  },
  baseURL: 'https://api.bscscan.com/api'
});

export const getRecentTransactions = (address, offset = 10000) => {
  return instance.get('', {
    params: {
      module: 'account',
      action: 'tokentx',
      sort: 'desc',
      page: 1,
      offset,
      contractaddress: config.contractAddress,
      address
    }
  });
};
