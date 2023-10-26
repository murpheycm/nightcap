import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const SiteContext = createContext();
const { Provider } = SiteContext;

const SiteProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    cocktails: [],
    ingredients: [],
    comments: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useSiteContext = () => {
  return useContext(SiteContext);
};

export { SiteProvider, useSiteContext };
