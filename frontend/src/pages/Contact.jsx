// src/pages/Contact.jsx
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData); // send to backend
      console.log('Message submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Message submit error:', err);
      setError('Failed to send message. Please try again later.');
    }
  };
  
  return (
    <>
    <NavigationBar/>
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 shadow-sm">
                <h2 className="mb-4 text-center">Contact Us</h2>
                {submitted && <Alert variant="success">Thank you! Your message has been sent.</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="formSubject" className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formMessage" className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Type your message..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="dark" type="submit" className="px-4 py-2 rounded-pill">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
