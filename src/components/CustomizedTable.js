import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '95%',
    // marginTop: theme.spacing.unit * 3,
    marginRight: '1rem',
    overflowX: 'auto',
  },
  table: {
    minWidth: '4rem',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function createData(place, img, name, points) {
  return { place, img, name, points };
}

function createRows(props) {
  let rows = []
  if (props.entries != undefined) {
    props.users.map(entry => (
      rows.push(createData(entry.name, entry.cost))
      ))
    return rows
  }
}

function CustomizedTable(props) {
  const { classes } = props;
  let rows = createRows(props)

  var header = <TableRow >
  <CustomTableCell align="center">History</CustomTableCell>
  </TableRow>

  var cells
  rows = [{cost: 583, name: "Komiwojazer nr 1"}]
  if (rows != undefined) {
    cells = rows.map(row => (
      <TableRow className={classes.row} key={row.cost}>
        <CustomTableCell align="left">{row.name}</CustomTableCell>
        <CustomTableCell align="right">{row.cost}</CustomTableCell>
      </TableRow>
    ))
  } else {
    cells = <div></div>
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
        {header}
        {cells}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
