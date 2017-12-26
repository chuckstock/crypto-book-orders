import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import AppBar from './AppBar'
const Landing = () => <div>I'm landing</div>
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar />
          <div className="container">
            <Route exact path="/" component={Landing} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
