import React, { useEffect, useState } from "react"
import Conversion from "./components/Conversion";
import Header from "./components/Header";

const url = `https://v6.exchangerate-api.com/v6/74d36f5de4fe53effc7a9641/latest/UAH`

function App() {
  const [currencies, setCurrencies] = useState([])
  const [currencyFrom, setCurrencyFrom] = useState()
  const [currencyTo, setCurrencyTo] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [isFromCurrency, setIsFromCurrency] = useState(true)
  const [headerCurrenciesData, setHeaderCurrenciesData] = useState([])
  const [headerCurrencies, setHeaderCurrencies] = useState([])

  let toAmount, fromAmount
  if (isFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url)
      const data = await res.json()
      const allCurencies = [...Object.keys(data.conversion_rates)]
      setCurrencies(allCurencies)
      setCurrencyFrom(data.base_code)
      setCurrencyTo(allCurencies[1])
      setExchangeRate(data.conversion_rates[allCurencies[1]])

      const headerCurrenciesDataArray = allCurencies.filter(currency => {
        switch (currency) {
          case "UAH":
            return currency
          case "EUR":
            return currency
          case "USD":
            return currency
          default: return null
        }
      })

      setHeaderCurrenciesData(headerCurrenciesDataArray)
    }

    fetchData().catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(currencyFrom && currencyTo) {
      const fetchData = async () => {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/74d36f5de4fe53effc7a9641/pair/${currencyFrom}/${currencyTo}`
        )
        const data = await res.json()
        setExchangeRate(data.conversion_rate)
      }

      fetchData().catch(err => console.log(err))
    }
    
  }, [currencyFrom, currencyTo])


  useEffect(() => {
    if (headerCurrenciesData) {
      const fetchData = async () => {
        const resUSD = await fetch(
          `https://v6.exchangerate-api.com/v6/74d36f5de4fe53effc7a9641/pair/USD/UAH`
        )
        const dataUSD = await resUSD.json()

        const resEUR = await fetch(
          `https://v6.exchangerate-api.com/v6/74d36f5de4fe53effc7a9641/pair/EUR/UAH`
        )
        const dataEUR = await resEUR.json()

        setHeaderCurrencies([
          {
            base_currency: "UAH",
            currency: dataUSD.base_code,
            amount: dataUSD.conversion_rate,
          },
          {
            base_currency: "UAH",
            currency: dataEUR.base_code,
            amount: dataEUR.conversion_rate,
          },
        ])
      }

      fetchData().catch(err => console.log(err))
    }
  }, [headerCurrenciesData])

  const handleSelectFromChange = e => {
    setCurrencyFrom(e.target.value)
  }

  const handleSelectToChange = e => {
    setCurrencyTo(e.target.value)
  }

  const handleFromAmountChange = e => {
    setAmount(e.target.value)
    setIsFromCurrency(true)
  }

  const handleToAmountChange = e => {
    setAmount(e.target.value)
    setIsFromCurrency(false)
  }

  return (
    <div className='container'>
      <Header currencies={headerCurrencies} />
      <Conversion
        currencies={currencies}
        selectedCurrency={currencyFrom}
        onSelectChange={handleSelectFromChange}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <p>⤋</p>
      <Conversion
        currencies={currencies}
        selectedCurrency={currencyTo}
        onSelectChange={handleSelectToChange}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  )
}

export default App;