import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
// import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import PostReview from './pages/PostReview';
import UploadCocktail from './pages/UploadCocktail';
import Cocktails from './pages/Cocktails';

import Cocktail from './pages/Cocktail';
import Business from './pages/Business';
import Tags from './pages/Tags';

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
        path: '/user/:id',
        element: <Profile />
      }, {
        path: '/account/settings',
        element: <ProfileSettings />
      }, {
        path: '/cocktail/:id/post-review',
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
        path: '/tags',
        element: <Tags />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
