
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { getProducts } from './apiService';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState('ANZ');
  const [category, setCategory] = useState('Laptop');
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(company, category, minPrice, maxPrice, topN);
      setProducts(products);
    };
    fetchProducts();
  }, [company, category, minPrice, maxPrice, topN]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Product Listing</Typography>
      <TextField label="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
      <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <TextField label="Min Price" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      <TextField label="Max Price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      <TextField label="Top N" type="number" value={topN} onChange={(e) => setTopN(e.target.value)} />
      <Button variant="contained" onClick={() => fetchProducts()}>Fetch Products</Button>
      <ProductList products={products} />
    </Container>
  );
};

export default App;

