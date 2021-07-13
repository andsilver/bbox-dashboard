import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useMetaMask } from 'metamask-react';
import { useDispatch } from 'react-redux';

import { setUser } from '../../../store/reducers/auth';

const Header = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { connect, status, account } = useMetaMask();
  const connected = status === 'connected';
  const [username, setUsername] = useState('');

  useEffect(() => {
    dispatch(setUser(account || null));

    if (account) {
      setUsername(account.slice(0, 4) + '...' + account.slice(-4));
    } else {
      setUsername(null);
    }
  }, [dispatch, account]);

  const connectAccount = () => {
    if (connected) {
      return;
    }
    connect();
  };

  return (
    <Grid container alignItems="center" justifyContent="center" className={styles.container}>
      <Grid item>
        <Typography variant="h4" component="h3">
          BlackBox Dashboard
        </Typography>
      </Grid>
      <Grid item className={styles.actions}>
        <Button variant="outlined" size="large">
          Home
        </Button>
        <Button variant="outlined" size="large" style={{ marginLeft: 12 }} onClick={connectAccount}>
          {username || 'Connect'}
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  container: {
    padding: 16,
    position: 'relative'
  },
  actions: {
    position: 'absolute',
    right: 16
  }
});

export default Header;
