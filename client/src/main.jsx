import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
// import Business from './pages/Business';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Map from './pages/Map';
import PostReview from './pages/PostReview';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
// import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';
// import PostReview from './pages/PostReview';
import UploadCocktail from './pages/UploadCocktail';
// import Cocktails from './pages/Cocktails';
import Cocktail from './pages/Cocktail';
import Business from './pages/Business';
import Tags from './pages/Tags';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true, 
        element: <LandingPage />
      }, 
      {
        path: '/home',
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
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/user/:id',
        element: <Profile />
      }, 
      {
        path: '/account/settings',
        element: <AccountSettings />
      }, 
      {
        path: '/cocktail/:id/post-review',
        element: <PostReview />
      }, 
      {
        path: '/cocktails/upload',
        element: <UploadCocktail />
      }, 
      {
        path: '/cocktails/:id',
        element: <Cocktail />
      }, 
      {
        path: '/business/:id',
        element: <Business />
      }, 
      {
        path: '/tags',
        element: <Tags />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
