import { useEffect, useState } from 'react';
import { jackpotRewardInfo } from '../consts';
import { ContentBox } from './ContentBox';

export const JackpotInfo = ({ jackpotInfo }) => {
  const [records, setRecords] = useState(jackpotRewardInfo);

  useEffect(() => {
    setRecords(
      jackpotRewardInfo.map((r, index) => ({
        ...r,
        value: (jackpotInfo[index] || 0) + ' ' + r.unit
      }))
    );
  }, [jackpotInfo]);

  return <ContentBox records={records}></ContentBox>;
};
