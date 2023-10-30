import { useQuery } from '@apollo/client';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Navbar } from '../components';

import { motion } from 'framer-motion';
import { styles } from '../styles';
import { EarthCanvas, StarsCanvas } from '../components/canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

function Form(props) {
  const formRef = useRef();
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
    <div>
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 xl:mt-12 xl:flex-row flex-col flex gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn('left', "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>New to us?</p>
        <h3 className={styles.sectionHeadText}>Start here!</h3>

        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Username</span>
            <input
            placeholder="Username"
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
          />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Email</span>
            <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
          />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>First Name</span>
            <input
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
          />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Last Name</span>
            <input
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
          />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Password</span>
            <input
            placeholder="******"
            name="password"
            type={showFields? 'text' : 'password'}
            id="password"
            onChange={handleChange}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
          />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Confirm Password</span>
            <input
            placeholder="******"
            name="confirmPassword"
            type={showFields? 'text' : 'password'}
            id="confirmPassword"
            onChange={handleChange}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
          />
          </label>
          <div className='flex flex-row'>
            <button type="button" 
              className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
              onClick={toggleShowFields}>
              {showFields ? 'Hide' : 'Show Password'}
            </button>
          </div>
          <div className='flex flex-row sm:block justify-center'>
          <button
              type="submit"
              className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
            >
              Go!
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
    </div>
  );
}

const Signup = () => {
  return (
    <div className='relative z-0 bg-primary'>
      <div className='bg-space-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Form />
      </div>
    </div>
  )
}

export default Signup;