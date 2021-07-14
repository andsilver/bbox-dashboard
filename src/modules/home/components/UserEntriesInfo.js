import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { userEntriesInfo } from '../consts';
import { ContentBox } from './ContentBox';

export const UserEntriesInfo = ({ transactions, entries, decimals }) => {
  const [records, setRecords] = useState(userEntriesInfo);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const { address, balance } = user;

    if (!transactions.length || !address || !decimals) {
      setRecords(userEntriesInfo);
      return;
    }
    const total = transactions
      .filter(t => t.to.toLowerCase() === address)
      .reduce((a, b) => a + +b.value / 10 ** +b.tokenDecimal, 0);

    const myEntries = entries.filter(entry => entry.toLowerCase() === address);
    const tempRecords = cloneDeep(userEntriesInfo);
    const winProbability = entries.length
      ? (myEntries.length / entries.length).toFixed(2) * 100
      : 0;
    tempRecords[0] = {
      ...tempRecords[0],
      value: myEntries.length
    };
    tempRecords[1] = {
      ...tempRecords[1],
      value: winProbability + tempRecords[1].unit
    };
    tempRecords[2] = {
      ...tempRecords[2],
      value: total + ' ' + tempRecords[2].unit
    };
    tempRecords[3] = {
      ...tempRecords[3],
      value: +balance / 10 ** +decimals + ' ' + tempRecords[3].unit
    };
    setRecords(tempRecords);
  }, [user, transactions, entries, decimals]);

  return <ContentBox records={records}></ContentBox>;
};
