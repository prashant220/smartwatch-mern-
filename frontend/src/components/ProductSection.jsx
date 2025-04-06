// src/components/ProductSection.jsx
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ProductSection.css';

const ArrowLeft = (props) => (
  <div className="custom-arrow custom-arrow-left position-absolute top-50 start-0 translate-middle-y" onClick={props.onClick}>
    <FaArrowLeft size={20} />
  </div>
);

const ArrowRight = (props) => (
  <div className="custom-arrow custom-arrow-right position-absolute top-50 end-0 translate-middle-y" onClick={props.onClick}>
    <FaArrowRight size={20} />
  </div>
);

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <ArrowLeft />, 
    nextArrow: <ArrowRight />, 
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 0', position: 'relative' }}>
      <Container>
        <h2 className="text-center mb-5 fw-bold">Our Smartwatches</h2>
        <Slider {...settings}>
          {products.map(product => (
            <div key={product._id} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
}
