import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'
import orange from 'material-ui/colors/orange'
import registerServiceWorker from './registerServiceWorker'

import App from './components/App'
import reducers from './ducks'

// dev only axios helpers
import axios from 'axios'
window.axios = axios

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  }
})

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
