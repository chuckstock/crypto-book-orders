import React, { Component } from 'react'
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

class SymbolList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  onListItemClick = symbol => {
    this.props.fetchOrderBooks(symbol)
    window.scrollTo(0, 0)
  }

  render() {
    const { classes, symbols, selectedSymbol } = this.props

    return (
      <div className={classes.root}>
        <List>
          {symbols.map(symbol => {
            return (
              <ListItem
                key={symbol}
                onClick={() => this.onListItemClick(symbol)}
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
