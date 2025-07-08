import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import edit from '../assets/edit.png';
import Delete from '../assets/bin.png';

function UserTable() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(user.length / usersPerPage);

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="container-fluid">
      <div className='row'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Full Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Employee ID</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.position}</td>
                <td>{item.department}</td>
                <td>{item.employeID}</td>
                <td>{item.location}</td>
                <td>
                  <div className="btn-are d-flex gap-3">
                    <img src={edit} alt="edit" className="img-fluid" style={{ height: "23px", cursor: "pointer" }} />
                    <img src={Delete} alt="delete" className="img-fluid" style={{ height: "23px", cursor: "pointer" }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-center flex-column align-items-center gap-2">
          <Pagination>{items}</Pagination>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
