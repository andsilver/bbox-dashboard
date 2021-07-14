import { useEffect, useState } from 'react';
import { Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { config } from '../../../config';

export const JackpotBalance = ({ capacity, balance, decimals }) => {
  const [jackpot, setJackpot] = useState({
    percent: 0,
    balance: 0
  });
  const styles = useStyles();

  useEffect(() => {
    if (!decimals) {
      return;
    }
    const calcBalance = +balance / 10 ** +decimals;

    setJackpot({
      percent: capacity && calcBalance ? ((+calcBalance / +capacity) * 100).toFixed(2) : 0,
      balance: calcBalance
    });
  }, [capacity, balance, decimals]);

  return (
    <Grid
      className={styles.jackpotContainer}
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Typography>
        <Link
          href={`https://www.bscscan.com/address/${config.lotteryWalletAddress}`}
          color="inherit"
        >
          {jackpot.balance} BBOX Jackpot
        </Link>
      </Typography>
      <div className={styles.jackpotBarContainer}>
        {jackpot.balance > 0 && (
          <div className={styles.jackpotBar} style={{ width: `${jackpot.percent}%` }}>
            <Typography
              className={styles.jackpotPercentText}
              component="h4"
              variant="h5"
              style={{
                color: jackpot.percent > 20 ? 'black' : 'white',
                right: jackpot.percent > 20 ? 8 : -64
              }}
            >
              {jackpot.percent}%
            </Typography>
          </div>
        )}
      </div>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  jackpotBarContainer: {
    borderRadius: 16,
    background: theme.palette.background.default,
    width: '100%',
    height: 60,
    marginTop: 16
  },
  jackpotContainer: {
    width: 400,
    margin: '80px 0'
  },
  jackpotBar: {
    background: 'white',
    height: 64,
    boxShadow: '0px 0px 13px 7px rgb(255 255 255 / 60%)',
    borderRadius: 16,
    position: 'relative'
  },
  jackpotPercentText: {
    position: 'absolute',
    top: 16
  }
}));
