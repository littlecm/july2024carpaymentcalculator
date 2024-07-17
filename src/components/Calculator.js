import React, { useState } from 'react';

const Calculator = () => {
  const query = new URLSearchParams(window.location.search);

  const [vehiclePrice, setVehiclePrice] = useState(query.get('vehiclePrice') || '');
  const [monthlyTerms, setMonthlyTerms] = useState(query.get('monthlyTerms') || 84);
  const [apr, setApr] = useState(query.get('apr') || 10.59);
  const [tradeInAmount, setTradeInAmount] = useState(query.get('tradeInAmount') || 0);
  const [downPayment, setDownPayment] = useState(query.get('downPayment') || 3500);

  const calculateMonthlyPayment = () => {
    if (!vehiclePrice) return 0;
    const principal = vehiclePrice - tradeInAmount - downPayment;
    const monthlyRate = apr / 100 / 12;
    const numPayments = monthlyTerms;
    const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    return monthlyPayment.toFixed(2);
  };

  const monthlyPayment = calculateMonthlyPayment();

  return (
    <div className="shad-container">
      <h1 className="shad-heading">Car Payment Calculator</h1>
      <div className="shad-form-group">
        <label>
          Vehicle Price: 
          <input className="shad-input" type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(e.target.value)} />
        </label>
      </div>
      <div className="shad-form-group">
        <label>
          Monthly Terms: 
          <input className="shad-input" type="number" value={monthlyTerms} onChange={(e) => setMonthlyTerms(e.target.value)} />
        </label>
      </div>
      <div className="shad-form-group">
        <label>
          APR (%): 
          <input className="shad-input" type="number" value={apr} onChange={(e) => setApr(e.target.value)} />
        </label>
      </div>
      <div className="shad-form-group">
        <label>
          Trade-in Amount: 
          <input className="shad-input" type="number" value={tradeInAmount} onChange={(e) => setTradeInAmount(e.target.value)} />
        </label>
      </div>
      <div className="shad-form-group">
        <label>
          Down Payment: 
          <input className="shad-input" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        </label>
      </div>
      <h2 className="shad-subheading">Estimated Monthly Payment: ${monthlyPayment}</h2>
    </div>
  );
};

export default Calculator;
