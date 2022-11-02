import React from "react"

function Header({ currencies }) {
  const headerCurrency = currencies.filter(currency => {
    if (currency.ccy === "EUR") {
      return currency
    } else if (currency.ccy === "USD") {
      return currency
    } else return null
  })
  return (
    <div className="header">
      <div className="header__logo">
        <img
          src="https://www.escpeurope.eu/sites/default/files/2020-06/0_jhX4TBwmshO_D5ny.jpg"
          alt="logo"
          width="1000"
          height="545"
        />
      </div>
      <div className="header__currencies">
        {headerCurrency.map(currency => (
          <p>
            <span className="header__currency">{currency.ccy}</span>
            <span>{`${currency.buy}/${currency.sale}`}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Header