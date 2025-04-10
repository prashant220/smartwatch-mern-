// src/pages/HomePage.jsx
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Home.css';
import ProductSection from '../components/ProductSection';
import '@fontsource/poppins';
import promoWatch from '../images/pic-1.jpg';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import RelatedProducts from '../components/RelatedProducts';
import Footer from '../components/Footer';
import Features from '../components/Features';
import GallerySection from '../components/Gallery';
import { useRef } from 'react';
import NavigationBar from '../components/NavigationBar';

export default function HomePage() {
  const productRef = useRef(null);
  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <NavigationBar onProductsClick={scrollToProducts} />
      <div className="hero-section">

        <Container>
          <Row className="align-items-center min-vh-100">
            <Col md={6} className="text-white">
              <h1 className="display-3 fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Smartwatches Made Smarter</h1>
              <p className="lead" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Track fitness, stay connected, and look stylish with our latest collection of smartwatches.
              </p>
              <Button 
                variant="light" 
                className="me-3 px-4 py-2" 
                style={{ transition: '0.3s', fontWeight: '500' }}
                onMouseOver={e => e.target.style.boxShadow = '0 4px 12px rgba(255,255,255,0.3)'}
                onMouseOut={e => e.target.style.boxShadow = 'none'}
              >
                Shop Now
              </Button>
              <Button 
                variant="outline-light" 
                className="px-4 py-2" 
                style={{ transition: '0.3s', fontWeight: '500' }}
                onMouseOver={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
              >
                Learn More
              </Button>
            </Col>
            <Col md={6} className="text-center d-flex justify-content-center align-items-center">
              <img 
                src={promoWatch} 
                alt="Smartwatch Promo" 
                className="img-fluid hero-watch"
                style={{ maxHeight: '500px', width: '90%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div ref={productRef}>
        <ProductSection />
      </div>
      <Features/>
      <GallerySection/>
      <Testimonials />
<Newsletter />
<RelatedProducts />
<Footer />
    </div>
  );
}
