import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  title: {
    textAlign: 'center'
  }
})

class PriceTable extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    const { classes, title, data = {} } = this.props
    console.log('data', data)

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} type="display3" gutterBottom>
          {title} Book
        </Typography>
        <Table style={{ tableLayout: 'fixed' }}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Exchange</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell numeric>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: 'auto', height: '500px' }}>
            {Object.keys(data).map(key => {
              return (
                <TableRow key={key}>
                  <TableCell>{data[key].exchanges}</TableCell>
                  <TableCell numeric>{key}</TableCell>
                  <TableCell numeric>{data[key].volume}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(PriceTable)
