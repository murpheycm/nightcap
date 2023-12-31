import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ 
    email: '', 
    password: '', 
    firstName: '', 
    lastName: '',
    username: '',
    confirmPassword: '',
  });
  const [showFields, setShowFields] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
        alert('Password and Confirm Password must match.');
        return;
    }

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        username: formState.username, 
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const toggleShowFields = () => {
    setShowFields(!showFields);
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>
    <form onSubmit={handleFormSubmit}>
      <h2>Signup</h2>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="Username"
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className={`flex-row space-between my-2 ${showFields ? 'show' : 'hide'}`}>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            name="password"
            type={showFields? 'text' : 'password'}
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className={`flex-row space-between my-2 ${showFields ? 'show' : 'hide'}`}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            placeholder="******"
            name="confirmPassword"
            type={showFields? 'text' : 'password'}
            id="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="button" onClick={toggleShowFields}>
            {showFields ? 'Hide' : 'Show'}
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;