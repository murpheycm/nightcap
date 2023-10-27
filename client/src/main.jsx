import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Business from './pages/Business';
import Cocktails from './pages/Cocktails';
import Home from './pages/Home';
// import NoMatch from './pages/Error';
import Login from './pages/Login';
import Map from './pages/Map';
import PostReview from './pages/PostReview';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
// import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
// import PostReview from './pages/PostReview';
import UploadCocktail from './pages/UploadCocktail';
// import Cocktails from './pages/Cocktails';
// import Cocktail from './pages/Cockatil';
// import Business from './pages/Business';
import Tag from './pages/Tag';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
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
      }, {
        path: '/profile/:id',
        element: <Profile />
      }, {
        path: '/profile/settings',
        element: <ProfileSettings />
      }, {
        path: '/post-review',
        element: <PostReview />
      }, {
        path: '/upload-cocktail',
        element: <UploadCocktail />
      }, {
        path: '/cocktails',
        element: <Cocktails />
      }, {
        path: '/cocktail/:id',
        element: <Cocktail />
      }, {
        path: '/business/:id',
        element: <Business />
      }, {
        path: '/tag/:id',
        element: <Tag />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
