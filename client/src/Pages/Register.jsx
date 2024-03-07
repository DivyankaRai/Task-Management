import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.completed) {
      alert("Please fill out all fields");
      return;
    }

    axios.post('http://localhost:8080/tasks', formData)
      .then(response => {
        console.log("Form submitted successfully:", response.data);
        setFormData({
            title: '',
            description: '',
            completed: ''
        });
        navigate("/");
      })
      .catch(error => {
        console.error("Error while submitting form data:", error);
      });
  };

  return (
    <>
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className='shadow'>
            <Card.Header as="h4" className="text-center">Add Some Tasks...</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="completed">
                  <Form.Label>Completed</Form.Label>
                  <Form.Control
                    as="select"
                    name="completed"
                    value={formData.completed}
                    onChange={handleChange}
                  >
                    <option value="">Select status</option>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Control>
                </Form.Group>

                <div className="text-center mt-3">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Register;
