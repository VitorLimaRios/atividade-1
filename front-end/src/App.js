import React, { useEffect, useState } from 'react';
import './App.css';
import ProductCard from './components/produtcCard';

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3002/products')
      .then(res => res.json())
      .then(products => setProducts(products));
    setLoading(false);
  }, []);

  return (
    <main className="App">
    <header>
      <h1>Leilao de centavos</h1>
    </header>
      <div className="products-container">
      { loading
        ? <p>Loading...</p>
        : products.map((item, index) => <ProductCard key={index} product={item} /> )
      }
      </div>
    </main>
  );
}

export default App;
