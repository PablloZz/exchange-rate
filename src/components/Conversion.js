import React from 'react'

function Conversion({
  currencies,
  selectedCurrency,
  onSelectChange,
  amount,
  onChangeAmount
}) {
  return (
    <div>
      <input type='number' value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onSelectChange}>
        {currencies.map(currencie => (
          <option key={currencie} value={currencie}>
            {currencie}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Conversion