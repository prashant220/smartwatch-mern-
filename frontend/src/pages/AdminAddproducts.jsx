// src/pages/AdminAddProduct.jsx
import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    brand: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-product', form);
      setSuccess(true);
      setError(null);
      setForm({ name: '', description: '', price: '', image: '', brand: '' });
    } catch (err) {
      setError('Failed to add product.');
      console.error(err);
    }
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4 text-center">Add New Product</h3>
        {success && <Alert variant="success">Product added successfully!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={form.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image" value={form.image} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" name="brand" value={form.brand} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="dark">Add Product</Button>
        </Form>
      </Card>
    </Container>
  );
}
