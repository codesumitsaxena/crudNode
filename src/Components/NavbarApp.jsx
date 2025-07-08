import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddNewUser from './AddNewUser'

function NavbarApp() {
  return (
    <Navbar expand="lg" bg="light" className="shadow-sm py-3">
      <Container fluid className="px-5 m-0">
        <Navbar.Brand href="#" className="fw-bold text-primary">User Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" />
          <Form className="d-flex me-3" style={{ maxWidth: '250px' }}>
            <Form.Control
              type="search"
              placeholder="Search users..."
              className="me-2"
              aria-label="Search"
            />
          </Form>

          <div className="d-flex gap-2">
            <AddNewUser/>
            <Button variant="outline-secondary">Settings</Button>
            <Button variant="outline-danger">Logout</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
