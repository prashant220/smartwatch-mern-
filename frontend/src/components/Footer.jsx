// src/components/Footer.jsx
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="py-4 bg-dark text-white mt-5">
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <p className="mb-0">&copy; {new Date().getFullYear()} SmartWear. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}