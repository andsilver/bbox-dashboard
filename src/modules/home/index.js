import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { JackpotInfo } from './components/JackpotInfo';
import { UserEntriesInfo } from './components/UserEntriesInfo';

export const Home = () => {
  const styles = useStyles();

  useEffect(() => {
    // getRecentTransactions().then(res => {
    //   console.log(res.data);
    // });
  }, []);

  return (
    <div className={styles.container}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <JackpotInfo></JackpotInfo>
        <UserEntriesInfo></UserEntriesInfo>
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
