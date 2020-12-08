import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardRecovered: {
    flexGrow: 1,
    borderLeft: '10px solid #00A785',
  },
  cardConfirm: {
    flexGrow: 1,
    borderLeft: '10px solid #ff6f00',
  },
  cardDead: {
    flexGrow: 1,
    borderLeft: '10px solid #512da8',
  },
  cardNotif: {
    flexGrow: 1,
    borderLeft: '10px solid #33691e',
  },
  cardSuspect: {
    flexGrow: 1,
    borderLeft: '10px solid #ffab00',
  },
  cardDiscarted: {
    flexGrow: 1,
    borderLeft: '10px solid #0d47a1',
  },
});
