import { Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { isAddress } from '../../shared/helper/contract';

export const ContentBox = ({ title, records, width = 360, minWidth = 360 }) => {
  const styles = useStyles();

  return (
    <Grid item style={{ width, minWidth }}>
      {title ? <Typography style={{ marginBottom: 8 }}>{title}</Typography> : <></>}
      <Grid className={styles.contentBox}>
        {records.length ? (
          records.map((r, index) => (
            <Grid key={index} container justifyContent="space-between">
              <Grid item>
                {isAddress(r.name) ? (
                  <Link
                    href={`https://bscscan.com/address/${r.name}`}
                    target="_blank"
                    color="inherit"
                  >
                    {r.name}
                  </Link>
                ) : (
                  r.name
                )}
              </Grid>
              <Grid item>{r.value ?? '-'}</Grid>
            </Grid>
          ))
        ) : (
          <Typography>No Records</Typography>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  contentBox: {
    borderRadius: 14,
    padding: '12px 16px',
    background: theme.palette.background.default,
    lineHeight: '28px'
  }
}));
