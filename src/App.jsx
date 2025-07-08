import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserTable from './Components/UserTable';
import NavbarApp from './Components/NavbarApp';
import AddNewUser from './Components/AddNewUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavbarApp />
      <Routes>
        <Route path='/' element={<UserTable />} />
        <Route path='/addNewUser' element={<AddNewUser />} />
      </Routes>
    </Router>
  );
}

export default App;
