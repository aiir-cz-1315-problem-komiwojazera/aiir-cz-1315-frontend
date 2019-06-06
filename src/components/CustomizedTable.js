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

function createData(name, points, id, tsp_path) { //(place, img, name, points) {
  //return { place, img, name, points };
  return { name, points, id, tsp_path };
}

function createRows(props) {
  let rows = []
  if (props.entries != undefined) {
    props.entries.map(entry => (
      rows.push(createData(entry.name, String(entry.cost), entry.id, entry.route))
      ))
    return rows
  }
}

function CustomizedTable(props) {
  const { classes } = props;
  let rows = createRows(props)

  const cols = [
	 { header : 'Name', name: 'name' },
     { header: 'route', name: 'route'},
	 { header: 'cost', name: 'cost' }
	];

  var header = <TableRow >
  <CustomTableCell align="center">History</CustomTableCell>
  </TableRow>

  var cells
 // rows = [{cost: 583, name: "Komiwojazer nr 1"}]  
  if (rows != undefined) {
    cells = rows.map(row => (
      <TableRow className={classes.row} key={row.id} cols={cols}>
        <CustomTableCell align="left">{row.name}</CustomTableCell>
		<CustomTableCell align="left" class="path_cell">{row.tsp_path}</CustomTableCell>
        <CustomTableCell align="right">{row.points}</CustomTableCell>
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
