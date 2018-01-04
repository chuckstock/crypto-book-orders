import reducer from './exchanges'
import * as types from './exchanges'

describe('exchanges reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoading: true,
      orderBooks: {},
      symbols: [],
      selectedSymbol: 'ETH/BTC'
    })
  })

  it('should handle FETCH_ORDER_BOOKS_REQUEST', () => {
    expect(
      reducer(
        {},
        {
          type: types.FETCH_ORDER_BOOKS_REQUEST,
          payload: 'Kylo Ren'
        }
      )
    ).toEqual({
      isLoading: true,
      selectedSymbol: 'Kylo Ren'
    })
  })

  it('should handle FETCH_ORDER_BOOKS', () => {
    expect(
      reducer(
        {},
        {
          type: types.FETCH_ORDER_BOOKS,
          payload: { data: 'Boba Fett' }
        }
      )
    ).toEqual({
      isLoading: false,
      orderBooks: 'Boba Fett'
    })
  })

  it('should handle FETCH_EXCHANGE_SYMBOLS_REQUEST', () => {
    expect(
      reducer(
        {},
        {
          type: types.FETCH_EXCHANGE_SYMBOLS_REQUEST
        }
      )
    ).toEqual({ isLoading: true })
  })

  it('should handle FETCH_EXCHANGE_SYMBOLS', () => {
    expect(
      reducer(
        {},
        {
          type: types.FETCH_EXCHANGE_SYMBOLS,
          payload: { data: 'Tatooine' }
        }
      )
    ).toEqual({ isLoading: false, symbols: 'Tatooine' })
  })
})
