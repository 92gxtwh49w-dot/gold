import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [prices, setPrices] = useState({
    zerodha: null,
    grt: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch Zerodha price
        const zerodhaRes = await fetch('http://localhost:3001/api/prices/zerodha');
        const zerodhaData = await zerodhaRes.json();

        // Fetch GRT price (Chennai as default)
        const grtRes = await fetch('http://localhost:3001/api/retailers/grt/chennai');
        const grtData = await grtRes.json();

        setPrices({
          zerodha: zerodhaData,
          grt: grtData,
          loading: false,
          error: null
        });
      } catch (err) {
        setPrices(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch prices'
        }));
      }
    };

    fetchPrices();
  }, []);

  if (prices.loading) return <div>Loading prices...</div>;
  if (prices.error) return <div>Error: {prices.error}</div>;

  return (
    <div className="container">
      <h1>Gold Price Comparison</h1>
      
      <div className="price-cards">
        <div className="price-card">
          <h2>Zerodha Gold</h2>
          {prices.zerodha && (
            <>
              <p>₹{prices.zerodha.pricePerGram} per gram</p>
              <small>Source: {prices.zerodha.source}</small>
            </>
          )}
        </div>

        <div className="price-card">
          <h2>GRT Jewellers</h2>
          {prices.grt && (
            <>
              <p>₹{prices.grt.pricePerGram} per gram</p>
              <small>City: {prices.grt.city}</small>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
