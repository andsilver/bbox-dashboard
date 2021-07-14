import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { config } from '../../config';
import { getRecentTransactions } from '../shared/helper/bsc-api';
import {
  contract,
  getBBoxBuyThresh,
  getBBoxCapacity,
  getBBoxDecimals,
  getBBoxHolderTaxAlloc,
  getBBoxPoolAdds,
  getBBoxTaxAllocation,
  getJackpotBalance
} from '../shared/helper/contract';
import { CurrentEntries } from './components/CurrentEntries';
import { JackpotBalance } from './components/JackpotBalance';
import { JackpotInfo } from './components/JackpotInfo';
import { RecentWinners } from './components/RecentWinners';
import { UserEntriesInfo } from './components/UserEntriesInfo';

export const Home = () => {
  const styles = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [entries, setEntries] = useState([]);
  const [jackpotInfo, setJackpotInfo] = useState([]);
  const [jackpotBalance, setJackpotBalance] = useState(0);
  const [decimal, setDecimal] = useState(null);

  const fetchContractInfo = () => {
    Promise.all([getRecentTransactions(config.lotteryWalletAddress), getJackpotBalance()]).then(
      ([res, balance]) => {
        setTransactions(res.data.result || []);
        setJackpotBalance(balance);
      }
    );
  };

  useEffect(() => {
    fetchContractInfo();

    Promise.all([
      getBBoxDecimals(),
      getBBoxPoolAdds(),
      getBBoxCapacity(),
      getBBoxBuyThresh(),
      getBBoxTaxAllocation(),
      getBBoxHolderTaxAlloc()
    ]).then(([decimals, entries, ...jackpotInfo]) => {
      setEntries(entries);
      setJackpotInfo(jackpotInfo);
      setDecimal(decimals);
    });

    contract.events.Transfer().on('data', () => {
      setTimeout(() => {
        fetchContractInfo();
      }, 10000);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <JackpotInfo jackpotInfo={jackpotInfo} />
        <UserEntriesInfo entries={entries} decimals={decimal} transactions={transactions} />
      </Grid>
      <Grid container justifyContent="center">
        <JackpotBalance balance={jackpotBalance} capacity={+jackpotInfo[0]} decimals={decimal} />
      </Grid>
      <Grid container justifyContent="space-between">
        <CurrentEntries entries={entries} minimum={+jackpotInfo[1]} />
        <RecentWinners transactions={transactions} />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    padding: '36px 120px'
  }
}));

export default Home;
