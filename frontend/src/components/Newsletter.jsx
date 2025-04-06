// src/components/Newsletter.jsx
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default function Newsletter() {
  return (
    <section className="py-5 text-white" style={{ backgroundColor: '#111' }}>
      <Container>
        <h3 className="text-center mb-3">Stay Updated</h3>
        <p className="text-center mb-4">Subscribe to receive product launches and exclusive offers!</p>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form className="d-flex bg-white p-2 rounded-pill">
              <Form.Control type="email" placeholder="Enter your email" className="border-0 rounded-pill me-2" />
              <Button variant="dark" className="px-4 rounded-pill">Subscribe</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}