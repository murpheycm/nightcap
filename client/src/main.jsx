import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Review from './pages/Review';
import Profile from './pages/Profile';
import Uploads from './pages/Uploads';
import Cocktails from './pages/Cocktails';
import Map from './pages/Map';
import Business from './pages/Business';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/cocktails',
        element: <Cocktails />
      }, {
        path: '/cocktails/:id',
        element: <Cocktails />
      }, {
        path: '/uploads/:id',
        element: <Uploads />
      }, {
        path: '/map',
        element: <Map />
      }, {
        path: '/reviews/:id',
        element: <Review />
      }, {
        path: '/business/:id',
        element: <Business />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
