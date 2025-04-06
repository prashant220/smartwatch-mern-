// src/components/RelatedProducts.jsx
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function RelatedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/related/all');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch related products:', err);
      }
    };
    fetchRelated();
  }, []);

  return (
    <section className="py-5 bg-white">
      <Container>
        <h3 className="text-center fw-bold mb-4">You Might Also Like</h3>
        <Row className="justify-content-center">
          {products.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
