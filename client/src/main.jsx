import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import PostReview from './pages/PostReview';
import UploadCocktail from './pages/UploadCocktail';
import Cocktails from './pages/Cocktails';
import Cocktail from './pages/Cockatil';
import Business from './pages/Business';
import Tag from './pages/Tag';

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
