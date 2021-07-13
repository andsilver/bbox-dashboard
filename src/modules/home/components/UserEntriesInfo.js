import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { getBBoxPoolAdds } from '../../shared/helper/contract';
import { userEntriesInfo } from '../consts';
import { ContentBox } from './ContentBox';
import { getRecentTransactions } from '../../shared/helper/bsc-api';

export const UserEntriesInfo = () => {
  const [records, setRecords] = useState(userEntriesInfo);
  const user = useSelector(state => state.auth);

  useEffect(() => {
    console.log(user);
    if (!user) {
      setRecords(userEntriesInfo);
      return;
    }
    console.log('user available');
    getRecentTransactions('0xAF7338ECb3d1cd21bfE33203435c0cabD02A648B').then(res => {
      console.log(res.data);
    });

    getBBoxPoolAdds().then(entries => {
      console.log('userEntriesInfo:', entries);
      const myEntries = entries.filter(
        entry => entry === '0xAF7338ECb3d1cd21bfE33203435c0cabD02A648B'
      );
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
      setRecords(tempRecords);
    });
  }, [user]);

  return <ContentBox records={records}></ContentBox>;
};
