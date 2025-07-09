import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

function AddNewUser() {
  const [modalShow, setModalShow] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    position: '',
    department: '',
    employeID: '',
    location: '',
    email: '',
    dob: '',
    phone: '',
    language: '',
    skill: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async () => {
    for (let key in newUser) {
      if (!newUser[key].trim()) {
        alert(`Please enter ${key}`);
        return;
      }
    }
  
    const userToSend = {
      ...newUser,
      language: newUser.language.split(',').map(l => l.trim()),
      skill: newUser.skill.split(',').map(s => s.trim())
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userToSend)
      });
  
      if (!res.ok) throw new Error("Failed to submit");
  
      const data = await res.json();
      console.log("✅ User saved:", data);
        setNewUser({
        fullName: '',
        position: '',
        department: '',
        employeID: '',
        location: '',
        email: '',
        dob: '',
        phone: '',
        language: '',
        skill: ''
      });
        setModalShow(false);
  
    } catch (err) {
      console.error("Error:", err);
      alert("Form submission failed");
    }
  };
  
    
  

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create New User
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={newUser.fullName}
                    onChange={handleChange}
                    placeholder="XYZ"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={newUser.position}
                    onChange={handleChange}
                    placeholder="Developer"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={newUser.department}
                    onChange={handleChange}
                    placeholder="Medical"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="employeID"
                    value={newUser.employeID}
                    onChange={handleChange}
                    placeholder="0000"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={newUser.location}
                    onChange={handleChange}
                    placeholder="Noida"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={newUser.dob}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleChange}
                    placeholder="87985XXXXX"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Languages (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={newUser.language}
                    onChange={handleChange}
                    placeholder="Hindi, English"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    name="skill"
                    value={newUser.skill}
                    onChange={handleChange}
                    placeholder="Expert Excel"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Add User</Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewUser;
