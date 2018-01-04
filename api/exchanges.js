import _ from 'lodash'
import express from 'express'
import ccxt from 'ccxt'
const orderBooks = []

const router = express.Router()

router.get('/order_books/:pairFirst/:pairSecond', async (req, res) => {
  const { pairFirst, pairSecond } = req.params
  const pair = `${pairFirst}/${pairSecond}`

  try {
    const poloniex = new ccxt.poloniex()
    const bittrex = new ccxt.bittrex()
    await poloniex.loadMarkets()
    await bittrex.loadMarkets()

    const poloOB = await poloniex.fetchOrderBook(pair)
    const bittrexOB = await bittrex.fetchOrderBook(pair)

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

router.get('/exchange_symbols', async (req, res) => {
  try {
    const poloniex = new ccxt.poloniex()
    const bittrex = new ccxt.bittrex()
    await poloniex.loadMarkets()
    await bittrex.loadMarkets()

    res.send(getCommonExchangeSymbols([poloniex.symbols, bittrex.symbols]))
  } catch (error) {
    res.send(error)
  }
})

// Only show symbols that are available on both exchanges
function getCommonExchangeSymbols(exchangeSymbols) {
  return exchangeSymbols[0].filter(function(x) {
    return exchangeSymbols.every(function(y) {
      if (y.indexOf(x) != -1) {
        y[y.indexOf(x)] = Infinity
        return true
      }
      return false
    })
  })
}

function createCombinedOBData(data) {
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
