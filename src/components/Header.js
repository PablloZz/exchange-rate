import React from "react"

function Header({currencies}) {
  console.log(currencies)
  return (
    <div className='header'>
      <div className='header__logo'>
        <img
          src='https://www.escpeurope.eu/sites/default/files/2020-06/0_jhX4TBwmshO_D5ny.jpg'
          alt='logo'
          width='1000'
          height='545'
        />
      </div>
      <div className='header__currencies'>
        {currencies.map(currency => (
          <p>
            <span className='header__currency'>{currency.currency}/{currency.base_currency}</span>
            <span>{currency.amount}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Header