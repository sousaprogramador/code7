import { makeStyles } from '@material-ui/core/styles';
import background from '../../assets/backgroun.jpg';

export const useStyles = makeStyles((theme) => ({
  bar: {
    background: 'white',
  },
  tolbar: {
    display: 'flex',
    flexDirection: 'row',
    background: 'white',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '90%',
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  barButton: {
    marginRight: theme.spacing(2),
    fontSize: 18,
    fontWeight: 'bold',
    padding: '15px 0',
    color: '#767676',
    borderBottom: '6px solid white',
    transition: '0.3s',
    '&:hover': {
      color: 'black',
      textDecoration: 'none',
      borderBottom: '6px solid #016aac', //# 00A785
    },
  },
  container: {
    background: '#F2FAF9',
    marginTop: 70,
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  topContent: {
    backgroundColor: '#016aac',
    flexDirection: 'row',
  },
  barPicText: {
    width: '100%',
  },
  title: {
    fontSize: 30,
    color: '#016aac',
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iframe: {
    height: '600px',
    width: '100%',
    marginBottom: 20,
  },
  title2: {
    marginTop: 30,
    fontSize: 30,
    color: '#616161',
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  barResponsive: {
    width: 'auto',
    maxWidth: '50%',
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    display: 'flex',
  },
  cardRecovered: {
    flexGrow: 1,
    borderLeft: '10px solid #016aac',
  },
  cardConfirm: {
    flexGrow: 1,
    borderLeft: '10px solid #ffca28',
  },
  cardDead: {
    flexGrow: 1,
    borderLeft: '10px solid #512da8',
  },
  cardTips: {
    display: 'flex',
    height: '100%',
  },
  care: {
    height: 400,
    objectFit: 'center',
  },
  icons: {
    height: 60,
    objectFit: 'center',
  },
  cardGridVideos: {
    padding: theme.spacing(3),
  },
  cardContent: {
    fontSize: 20,
    flexGrow: 1,
  },
  cardIc: {
    background: 'rgba(255,255,255, 0.8)',
    borderRadius: 6,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.2s',
    '&:hover': {
      display: 'flex',
      transform: 'translateX(8px)',
      textDecoration: 'none',
    },
  },
  cardIcContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  titleVideos: {
    fontSize: 30,
    color: 'white',
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  //
  videoMask: {
    backgroundColor: 'rgba(1,106,172, 0.65)',
  },
  videoFO: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  //
  footerMask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(1,106,172, 0.65)',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}));
