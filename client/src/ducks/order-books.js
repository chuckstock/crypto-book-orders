import axios from 'axios'

// Actions
export const FETCH_ORDER_BOOKS = 'fetch-order-books'

// Reducer
export default (state = {}, action) => {
  const actions = {
    [FETCH_ORDER_BOOKS]: () => action.payload.data,
    default: () => state
  }

  return (actions[action.type] || actions.default)()
}

// Action Creators
export const fetchOrderBooks = () => async dispatch => {
  const res = await axios.get('/api/exchanges/order_books')

  dispatch({
    type: FETCH_ORDER_BOOKS,
    payload: res
  })
}
