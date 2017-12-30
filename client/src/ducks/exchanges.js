import axios from 'axios'

// Actions
export const FETCH_ORDER_BOOKS = 'fetch-order-books'
export const FETCH_ORDER_BOOKS_REQUEST = 'fetch-order-books-request'

const INITIAL_STATE = {
  isLoading: true,
  orderBooks: {},
  symbols: [],
  selectedSymbol: 'ETH/BTC'
}
// Reducer
export default (state = INITIAL_STATE, action) => {
  const actions = {
    [FETCH_ORDER_BOOKS]: () => {
      return {
        ...state,
        orderBooks: action.payload.data,
        symbols: action.payload.data.symbols,
        isLoading: false
      }
    },
    [FETCH_ORDER_BOOKS_REQUEST]: () => ({
      ...state,
      selectedSymbol: action.payload,
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
