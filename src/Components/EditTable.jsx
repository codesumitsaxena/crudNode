import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

function EditTable({ userData, onUpdated, onHide }) {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || '',
        position: userData.position || '',
        department: userData.department || '',
        employeID: userData.employeID || '',
        location: userData.location || '',
        email: userData.email || '',
        dob: userData.dob ? userData.dob.substring(0, 10) : '',
        phone: userData.phone || '',
        language: Array.isArray(userData.language) ? userData.language.join(', ') : '',
        skill: Array.isArray(userData.skill) ? userData.skill.join(', ') : ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!userData?._id) {
      alert("User ID is missing. Cannot update.");
      return;
    }

    const updatedData = {
      ...formData,
      language: formData.language.split(',').map(l => l.trim()),
      skill: formData.skill.split(',').map(s => s.trim())
    };

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });

      if (!res.ok) throw new Error("Update failed");
      alert("User updated!");
      onUpdated(); 
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    }
  };

  return (
    <Modal show={!!userData} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {["fullName", "position", "department", "employeID", "location", "email", "dob", "phone", "language", "skill"].map((field, idx) => (
              <Col md={6} key={idx}>
                <Form.Group className="mb-3">
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type={field === "dob" ? "date" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTable;
