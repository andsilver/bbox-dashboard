import { ContentBox } from './ContentBox';

export const RecentWinners = ({ transactions }) => {
  return (
    <ContentBox
      title="RECENT WINNERS"
      width="30%"
      minWidth={480}
      records={transactions.slice(0, 10).map(({ to, value, tokenDecimal }) => ({
        name: to,
        value: +value / 10 ** +tokenDecimal
      }))}
    />
  );
};
