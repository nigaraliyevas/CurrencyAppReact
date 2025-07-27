import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [currencyKey, setCurrencyKey] = useState({});
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [numberFrom, setNumberFrom] = useState(0);
  const [numberTo, setNumberTo] = useState(0);

  const BASE_API = "https://api.freecurrencyapi.com/v1/latest?apikey=";
  const API_KEY = import.meta.env.VITE_SOME_KEY;
  useEffect(() => {
    const getKeysOfCurrency = async () => {
      const response = await axios.get(BASE_API + API_KEY);
      setCurrencyKey(response.data.data);
    };
    getKeysOfCurrency();
  }, [BASE_API,API_KEY]);

  const exchange = async () => {
    if (!currencyFrom || !currencyTo) {
      alert("please choose currensy field.");
      return;
    }
    const selectedCurrency = await axios.get(`${BASE_API}${API_KEY}&base_currency=${currencyFrom}`);
    
    const rateFrom = selectedCurrency.data.data[currencyFrom];
    

    const rateTo = selectedCurrency.data.data[currencyTo];

    if (!rateFrom || !rateTo) {
      alert("Invalid currency selection.");
      return;
    }

    const convertedValue = (numberFrom / rateFrom) * rateTo;
    setNumberTo(convertedValue.toFixed(2));
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    await exchange();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} id="form">
        <div className="currencyContainer">
          <h2>Welcome To Currency Converter</h2>
          <div className="d-flex">
            <div className="currencyFrom">
              <input type="number" value={numberFrom} onChange={ev => setNumberFrom(ev.target.value)} />
              <select value={currencyFrom} onChange={ev => setCurrencyFrom(ev.target.value)}>
                <option value="" disabled>
                  Choose Currency
                </option>
                {Object.keys(currencyKey).map(key => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="currencyTo">
              <input value={numberTo} type="number" disabled />
              <select value={currencyTo} onChange={ev => setCurrencyTo(ev.target.value)}>
                <option value="" disabled>
                  Choose Currency
                </option>
                {Object.keys(currencyKey).map(key => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Convert</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
