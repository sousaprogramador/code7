import { TableCell, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#eceff1',
    color: theme.palette.common.black,
    fontSize: 15,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
