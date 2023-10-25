import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Business from './pages/Business';
import Cocktails from './pages/Cocktails';
import Home from './pages/Home';
import Login from './pages/Login';
import Map from './pages/Map';
import PostReview from './pages/PostReview';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import UploadCocktail from './pages/UploadCocktail';
import UploadProfile from './pages/UploadProfile';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        path: '/business/:id',
        element: <Business />
      }, 
      {
        path: '/cocktails',
        element: <Cocktails />
      }, 
      {
        path: '/cocktails/:id',
        element: <Cocktails />
      },
      {
        index: true, 
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/map',
        element: <Map />
      },
      {
        path: '/postReview/:id',
        element: <PostReview />
      }, 
      {
        path: '/profile',
        element: <Profile />
      }, 
      {
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/uploads-cocktail/:id',
        element: <UploadCocktail />
      },
      {
        path: '/uploads-profile/:id',
        element: <UploadProfile />
      },
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
