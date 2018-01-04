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
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  title: {
    textAlign: 'center'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px'
  },
  exchange: {
    textTransform: 'Capitalize'
  }
})

class PriceTable extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  render() {
    const { classes, title, data, isLoading } = this.props

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title} type="display3" gutterBottom>
          {title} Book
        </Typography>
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Exchanges</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell numeric>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              Object.keys(data).map(key => {
                return (
                  <TableRow key={key}>
                    <TableCell className={classes.exchange}>
                      {data[key].exchanges.join(' | ')}
                    </TableCell>
                    <TableCell numeric>{key}</TableCell>
                    <TableCell numeric>{data[key].volume}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        {isLoading && (
          <div className={classes.loader}>
            <CircularProgress size={100} />
          </div>
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(PriceTable)
