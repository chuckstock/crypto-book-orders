import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react'

import AppBar from './AppBar'
import OrderBook from './OrderBook'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar>
          <OrderBook />
        </AppBar>
      </div>
    )
  }
}

export default App
