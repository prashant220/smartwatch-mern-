import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export default function OrderSuccess() {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8}>
          <FaCheckCircle size={80} color="green" className="mb-4" />
          <h2 className="fw-bold">Thank You for Your Purchase!</h2>
          <p className="lead">Your order has been placed successfully. A confirmation email will be sent shortly.</p>
          <p>Track your order status or continue shopping from the homepage.</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button as={Link} to="/" variant="primary" className="px-4">
              Continue Shopping
            </Button>
            <Button as={Link} to="/orders" variant="outline-dark" className="px-4">
              View My Orders
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
