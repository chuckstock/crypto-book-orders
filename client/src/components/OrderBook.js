import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrderBooks } from '../ducks/order-books'
import PriceTable from './PriceTable'

class OrderBook extends Component {
  componentDidMount() {
    this.props.fetchOrderBooks()
  }

  createPriceData() {
    const { orderBooks } = this.props
    Object.keys(orderBooks).map(key => {
      orderBooks[key]
    })
  }

  render() {
    console.log('this.props', this.props)
    const { orderBooks } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <PriceTable title="Ask" data={orderBooks.asks} />
        <div style={{ width: '24px' }} />
        <PriceTable title="Bid" data={orderBooks.bids} />
      </div>
    )
  }
}

function mapStateToProps({ orderBooks }) {
  return { orderBooks }
}

export default connect(mapStateToProps, { fetchOrderBooks })(OrderBook)
