import { Grid, makeStyles, Typography } from '@material-ui/core';

export const ContentBox = ({ title, records }) => {
  const styles = useStyles();

  return (
    <Grid item className={styles.contentBox}>
      {title ? <Typography>{title}</Typography> : <></>}
      {records.map((r, index) => (
        <Grid key={index} container justifyContent="space-between">
          <Grid item>{r.name}</Grid>
          <Grid item>{r.value ?? '-'}</Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  contentBox: {
    borderRadius: 14,
    padding: 16,
    width: 360,
    background: theme.palette.background.default,
    lineHeight: '28px'
  }
}));
