// src/components/RelatedProducts.jsx
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function RelatedProducts() {
  const placeholderProducts = [
    {
      id: 1,
      name: "NoiseFit Halo",
      image: "images/gallery1.jpg",
      price: 149,
    },
    {
      id: 2,
      name: "Boat Ultima Call",
      image: "https://images.unsplash.com/photo-1600185365002-5570420a8eeb",
      price: 119,
    },
    {
      id: 3,
      name: "Realme Watch 3",
      image: "https://images.unsplash.com/photo-1600185365032-995c9e0600c3",
      price: 99,
    },
  ];

  return (
    <section className="py-5 bg-white">
      <Container>
        <h3 className="text-center fw-bold mb-4">You Might Also Like</h3>
        <Row className="justify-content-center">
          {placeholderProducts.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body className="text-center">
                  <Card.Title>{product.name}</Card.Title>
                  <h6 className="text-muted">${product.price}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
