import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './components/Home';
import ForgetPassword from './components/ForgetPassword';
import NewSubmit from './components/NewSubmit';
import Login from './components/Login';
import Register from './components/Register';


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/forget-pass" element={<ForgetPassword />} />
          <Route path="/otp" element={<NewSubmit />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;