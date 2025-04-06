import { Container, Row, Col } from 'react-bootstrap';
import { FaClipboardList, FaBoxOpen } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight, FaMobileAlt, FaTruck, FaSmile } from 'react-icons/fa';

import './Features.css';

export default function Features() {
    return (
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <h2 className="how-it-works-title">How It Works</h2>
          <div className="how-it-works-steps">
            <div className="step step-subscribe">
              <FaMobileAlt className="step-icon" size={50} />
              <h4>Choose Your Smartwatch</h4>
              <p>Pick from our latest wearable devices tailored for style and functionality.</p>
            </div>
            <div className="step step-ship">
              <FaTruck className="step-icon" size={50} />
              <h4>Shipped to You</h4>
              <p>We pack and ship your smartwatch securely right to your doorstep worldwide.</p>
            </div>
            <div className="step step-enjoy">
              <FaSmile className="step-icon" size={50} />
              <h4>Track & Enjoy</h4>
              <p>Unbox, connect, and start tracking your fitness, health, and lifestyle in style.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
