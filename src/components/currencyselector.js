import React, { useContext, useEffect, useState } from 'react';
import { myContext } from '../context/provider';

const CurrencySelector = ({ selectedCurrency, onChange }) => {
  // Read the selected currency from session storage and use it as the initial state
  const [currency, setCurrency] = useState(sessionStorage.getItem('selectedCurrency') || selectedCurrency);
  const { setCurrencys } = useContext(myContext)

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency); setCurrencys(selectedCurrency)
    onChange(selectedCurrency);
    // window.location.reload();
  };

  // Save the selected currency in session storage when it changes
  useEffect(() => {
    sessionStorage.setItem('selectedCurrency', currency);
  }, [currency]);

  return (
    <select className='currency-selector' value={currency} style={{"border":"none"}} onChange={handleCurrencyChange}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="AUD">AUD</option>
    </select>
  );
};

export default CurrencySelector;
