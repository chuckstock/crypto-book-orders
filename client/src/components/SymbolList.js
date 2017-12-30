import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { connect } from 'react-redux'
import { fetchOrderBooks } from '../ducks/exchanges'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper
  },
  active: {
    backgroundColor: theme.palette.common.faintBlack
  }
})

function SymbolList(props) {
  const { classes, symbols, selectedSymbol, fetchOrderBooks } = props

  return (
    <div className={classes.root}>
      <List>
        {symbols.map(symbol => {
          return (
            <ListItem
              key={symbol}
              onClick={() => fetchOrderBooks(symbol)}
              className={symbol === selectedSymbol ? classes.active : ''}
              button
            >
              <ListItemText primary={symbol} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

SymbolList.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps({ exchanges }) {
  return {
    symbols: exchanges.symbols,
    selectedSymbol: exchanges.selectedSymbol
  }
}

export default connect(mapStateToProps, { fetchOrderBooks })(
  withStyles(styles)(SymbolList)
)
