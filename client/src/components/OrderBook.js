import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrderBooks, fetchExchangeSymbols } from '../ducks/exchanges'
import PriceTable from './PriceTable'

class OrderBook extends Component {
  componentDidMount() {
    this.props.fetchOrderBooks(this.props.selectedSymbol)
    this.props.fetchExchangeSymbols()
  }

  render() {
    const { orderBooks, isLoading, selectedSymbol } = this.props

    return (
      <div>
        <h2>{selectedSymbol} Order Book</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <PriceTable
            title="Ask"
            isLoading={isLoading}
            data={orderBooks.asks}
          />
          <div style={{ width: '24px' }} />
          <PriceTable
            title="Bid"
            isLoading={isLoading}
            data={orderBooks.bids}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ exchanges }) {
  return {
    orderBooks: exchanges.orderBooks,
    isLoading: exchanges.isLoading,
    selectedSymbol: exchanges.selectedSymbol
  }
}

export default connect(mapStateToProps, {
  fetchOrderBooks,
  fetchExchangeSymbols
})(OrderBook)
