import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Navbar } from '../components';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { EarthCanvas, StarsCanvas } from '../components/canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

function LoginForm(props) {
  const [formState, setFormState] = useState({ identifier: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { identifier: formState.identifier, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>

      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 xl:mt-12 xl:flex-row flex-col flex gap-10 overflow-hidden`}>
        <motion.div
          variants={slideIn('left', "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>Welcome</p>
          <h3 className={styles.sectionHeadText}>Login</h3>

          <form
            onSubmit={handleFormSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className='flex flex-col' htmlFor="identifier">
              <span className='text-white font-medium mb-4'>Username or Email</span>
              <input
                placeholder="Username or Email"
                name="identifier"
                type="text"
                id="identifier"
                onChange={handleChange}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
              />
            </label>

            <label className='flex flex-col' htmlFor="pwd">
              <span className='text-white font-medium mb-4'>Password</span>
              <input
                placeholder="Password"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
              />
            </label>
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}

            <div className='flex flex-row sm:block justify-center'>
              <button
                type="submit"
                className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
              >
                Go!
              </button>
            </div>
            <div className='flex flex-row sm:block justify-center'>
              <Link to="/signup" className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'>Dont Have an account?</Link>
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

const Login = () => {
  return (
    <div className='relative z-0 bg-primary w-full h-screen mx-auto'>
      <div className='bg-space-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;