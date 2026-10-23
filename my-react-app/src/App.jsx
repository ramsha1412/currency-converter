import { useMemo, useState } from 'react';

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 155.50,
  INR: 94.94
};

export function CurrencyConverter() {
  const [value, setValue] = useState({
    val: '',
    fromCurr: 'USD', 
    toCurr: 'EUR',
  });

  const availableOptions = useMemo(() => [
    { id: 'USD', label: 'USD' },
    { id: 'EUR', label: 'EUR' },
    { id: 'GBP', label: 'GBP' },
    { id: 'JPY', label: 'JPY' },
    { id: 'INR', label: 'INR' },
  ], []);

  function handleSelectChange(e) {
    const { id, value: inputValue } = e.target;
    setValue((prevData) => ({
      ...prevData,
      [id]: inputValue
    }));
  }
   
  const convertedResultsMap = useMemo(() => {
    const amount = parseFloat(value.val);
    if (isNaN(amount)) return {};

    const amountInUSD = amount / EXCHANGE_RATES[value.fromCurr]; 
    
    return {
      USD: (amountInUSD * EXCHANGE_RATES.USD).toFixed(2),
      EUR: (amountInUSD * EXCHANGE_RATES.EUR).toFixed(2),
      GBP: (amountInUSD * EXCHANGE_RATES.GBP).toFixed(2),
      JPY: (amountInUSD * EXCHANGE_RATES.JPY).toFixed(2),
      INR: (amountInUSD * EXCHANGE_RATES.INR).toFixed(2),
    };
  }, [value.val, value.fromCurr]);

  const displayAmount = convertedResultsMap[value.toCurr] || '';

  return (
    <div id="main">
      <h1>CURRENCY CONVERTER</h1>
      <input id="val" type="number" value={value.val} onChange={handleSelectChange}/>
      
      <div id="select-div">
      <select id="fromCurr" value={value.fromCurr} onChange={handleSelectChange}> 
        {availableOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      
      <select id="toCurr" value={value.toCurr} onChange={handleSelectChange}>
        {availableOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      </div>

      {value.val && (
        <div id="text" style={{ marginTop: '10px', fontWeight: 'bold' }}>
          Converted Amount: {displayAmount} {value.toCurr}
        </div>
      )}
    </div>
  );
}
