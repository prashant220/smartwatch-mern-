// src/components/Testimonials.jsx
import { Container, Row, Col } from 'react-bootstrap';
import './Testinomials.css';
import { FaQuoteLeft } from 'react-icons/fa';

export default function TestimonialSection() {
  const testimonials = [
    "Smartwear offers the most stunning watch designs and I’m in love with their build quality!",
    "The perfect balance of function and style. My smartwear keeps me connected and fit.",
    "Customer service is top notch and delivery was super quick. Highly recommend Smartwear!"
  ];

  return (
    <section className="testimonial-section">
      <h2 className="text-center mb-4">Reviews</h2>
      <div className="testimonial-wrapper">
        {testimonials.map((text, idx) => (
          <div key={idx} className="testimonial-box">
            <FaQuoteLeft className="quote-icon" />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}