import { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  console.log(products);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  console.log(editId);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
  
    if (imageFile) {
      formData.append("image", imageFile); 
    } else if (form.image) {
      
      formData.append("image", form.image); 
    } else {
      alert("Please upload an image.");
      return;
    }
  
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMessage("Product updated successfully.");
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product added successfully.");
      }
  
      setForm({ name: "", description: "", price: "", image: "" });
      setImageFile(null);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("An error occurred while submitting the product.");
    }
  };
  
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: "",
    });
    setEditId(product._id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setMessage("Product deleted successfully.");
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="py-5">
        <h2 className="mb-4">Admin Dashboard</h2>
        {message && <Alert variant="success">{message}</Alert>}

        <Card className="p-4 mb-4">
          <h5>{editId ? "Edit Product" : "Add New Product"}</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
              <Col md={1} className="d-flex align-items-end">
                <Button type="submit" variant="dark">
                  {editId ? "Update" : "Add"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    width="50"
                    height="50"
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleEdit(product)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
