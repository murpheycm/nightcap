import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const UserContext = createContext();
const { Provider } = UserContext;
const CommentContext = createContext();


const UserProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: [],
    business: [],
    cocktail: [],
    comments: [],
    follower: [],
    image: [],
    profile: [],
    reaction: [],
    reviews: [],
    tags: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
