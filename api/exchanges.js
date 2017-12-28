import express from 'express'
import ccxt from 'ccxt'
import orderBooks from '../client/src/ducks/order-books'

const router = express.Router()

router.get('/order_books', async (req, res) => {
  let poloOB, bittrexOB
  try {
    const poloniex = new ccxt.poloniex()
    const bittrex = new ccxt.bittrex()
    poloOB = await poloniex.fetchOrderBook('ETH/BTC')
    bittrexOB = await bittrex.fetchOrderBook('ETH/BTC')

    res.send(
      createCombinedOBData({
        [poloniex.id]: poloOB,
        [bittrex.id]: bittrexOB
      })
    )
  } catch (error) {
    res.send(error)
  }
})

function createCombinedOBData(data) {
  console.log(Object.keys(data))

  const results = { asks: {}, bids: {} }
  Object.keys(data).forEach(exchange => {
    Object.keys(results).forEach(orderType => {
      const priceAndVolume = data[exchange][orderType]

      priceAndVolume.forEach(data => {
        const price = data[0]
        const volume = data[1]

        // If the price exists, add the exchange to the price
        if (results[orderType][price]) {
          results[orderType][price].exchanges.push(exchange)
          results[orderType][price].volume += volume
        } else {
          results[orderType][price] = { volume, exchanges: [exchange] }
        }
      })
    })
  })

  return results
}

export default router
