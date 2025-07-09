import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import edit from '../assets/edit.png';
import Delete from '../assets/bin.png';
import EditTable from './EditTable';

function UserTable() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
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
              <tr key={item._id}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.position}</td>
                <td>{item.department}</td>
                <td>{item.employeID}</td>
                <td>{item.location}</td>
                <td>
                  <div className="btn-are d-flex gap-3">
                    <img
                      src={edit}
                      alt="edit"
                      className="img-fluid"
                      style={{ height: "23px", cursor: "pointer" }}
                      onClick={() => setSelectedUser(item)}
                    />
                    <img
                      src={Delete}
                      alt="delete"
                      className="img-fluid"
                      style={{ height: "23px", cursor: "pointer" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-center flex-column align-items-center gap-2">
          <Pagination>{paginationItems}</Pagination>
        </div>
      </div>

      {selectedUser && (
        <EditTable
          userData={selectedUser}
          onUpdated={() => {
            fetchUsers();
            setSelectedUser(null); 
                    }}
          onHide={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UserTable;
