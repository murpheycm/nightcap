import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
// import { UserProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="nav">
         <Nav />
        </div>
        <div className="container">
          <h1>2222222</h1>
          <Outlet />
        </div>
    </ApolloProvider>
  );
}

export default App;
