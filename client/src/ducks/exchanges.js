import axios from 'axios'

// Actions
export const FETCH_ORDER_BOOKS_REQUEST = 'fetch-order-books-request'
export const FETCH_ORDER_BOOKS = 'fetch-order-books'
export const FETCH_EXCHANGE_SYMBOLS_REQUEST = 'fetch-exchange-symbols-request'
export const FETCH_EXCHANGE_SYMBOLS = 'fetch-exchange-symbols'

const INITIAL_STATE = {
  isLoading: true,
  orderBooks: {},
  symbols: [],
  selectedSymbol: 'ETH/BTC'
}
// Reducer
export default (state = INITIAL_STATE, action) => {
  const actions = {
    [FETCH_ORDER_BOOKS]: () => ({
      ...state,
      orderBooks: action.payload.data,
      isLoading: false
    }),
    [FETCH_ORDER_BOOKS_REQUEST]: () => ({
      ...state,
      selectedSymbol: action.payload,
      isLoading: true
    }),
    [FETCH_EXCHANGE_SYMBOLS]: () => ({
      ...state,
      isLoading: false,
      symbols: action.payload.data
    }),
    [FETCH_EXCHANGE_SYMBOLS_REQUEST]: () => ({
      ...state,
      isLoading: true
    }),
    default: () => state
  }

  return (actions[action.type] || actions.default)()
}

// Action Creators
export const fetchOrderBooks = pair => async dispatch => {
  dispatch({ type: FETCH_ORDER_BOOKS_REQUEST, payload: pair })
  const res = await axios.get(`/api/exchanges/order_books/${pair}`)

  dispatch({
    type: FETCH_ORDER_BOOKS,
    payload: res
  })
}

export const fetchExchangeSymbols = () => async dispatch => {
  dispatch({ type: FETCH_EXCHANGE_SYMBOLS_REQUEST })
  const res = await axios.get(`/api/exchanges/exchange_symbols`)

  dispatch({
    type: FETCH_EXCHANGE_SYMBOLS,
    payload: res
  })
}
