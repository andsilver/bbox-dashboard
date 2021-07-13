import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLotteryCapacity } from '../../../store/reducers/lottery';
import {
  getBBoxBuyThresh,
  getBBoxCapacity,
  getBBoxHolderTaxAlloc,
  getBBoxTaxAllocation
} from '../../shared/helper/contract';
import { jackpotRewardInfo } from '../consts';
import { ContentBox } from './ContentBox';

export const JackpotInfo = () => {
  const [records, setRecords] = useState(jackpotRewardInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      getBBoxCapacity(),
      getBBoxBuyThresh(),
      getBBoxTaxAllocation(),
      getBBoxHolderTaxAlloc()
    ]).then(results => {
      dispatch(setLotteryCapacity(results[0]));
      setRecords(
        jackpotRewardInfo.map((r, index) => ({
          ...r,
          value: results[index] + ' ' + r.unit
        }))
      );
    });
  }, [dispatch]);

  return <ContentBox records={records}></ContentBox>;
};
