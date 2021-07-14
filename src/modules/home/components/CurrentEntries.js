import { useEffect, useState } from 'react';
import { config } from '../../../config';
import { getRecentTransactions } from '../../shared/helper/bsc-api';
import { getAmountFromTransaction } from '../../shared/helper/utils';
import { ContentBox } from './ContentBox';

export const CurrentEntries = ({ entries, minimum }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!entries.length || !minimum) {
      return;
    }
    const addresses = Array.from(new Set(entries));

    Promise.all(addresses.map(entry => getRecentTransactions(entry))).then(res => {
      const allTxns = res.map(({ data: { result } }) => result);
      const items = [];

      for (const entry of entries) {
        const address = entry.toLowerCase();
        const txns = allTxns.find(
          t => t[0].from.toLowerCase() === address || t[0].to.toLowerCase() === address
        );
        const txnIndex = txns.findIndex(
          t =>
            t.to.toLowerCase() === address &&
            t.from.toLowerCase() === config.pancakeSwapBBox2Address &&
            getAmountFromTransaction(t) >= +minimum
        );
        const txn = txns[txnIndex];
        txns.splice(txnIndex, 1);
        items.push({
          name: address,
          value: getAmountFromTransaction(txn)
        });
      }
      setRecords(items);
    });
  }, [entries, minimum]);

  return <ContentBox width="30%" minWidth={480} title="CURRENT ENTRIES" records={records} />;
};
