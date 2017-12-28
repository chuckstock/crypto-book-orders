import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper
  }
})

function SimpleList(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <ListItemText primary="ETH/BTC" />
        </ListItem>
      </List>
    </div>
  )
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleList)
