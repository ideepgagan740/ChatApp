import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import BackendService from '../../service/service';
// import {BackendService} from '../../service/service'
function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    BackendService.signUp(formData)
    // BackendService.signUp(formData)
  };

  return (
    <div className='container m-auto flex items-center justify-center font-bold text-white'> 
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Name:</label>
          <input className="text-black" type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input className="text-black" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input className="text-black" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
        <button type="submit">Sign Up</button>
        </div>
        <div>
      <Link to="/SignIn"><button className="underline">Or already existing user</button></Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
