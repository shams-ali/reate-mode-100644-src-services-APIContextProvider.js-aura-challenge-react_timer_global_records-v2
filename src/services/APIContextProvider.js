import React from 'react';
import mockFetch from '../util/mockFetch';

const Context = React.createContext(null);

export const useItemData = () => {
  const contextState = React.useContext(Context);
  if (contextState === null) {
    throw new Error('useItemData must be used within a ItemDataProvider tag');
  }
  return contextState;
};

const ItemDataProvider = (props) => {
  const [state, setState] = 
    React.useState({ status: 'LOADING', results: [] });

  React.useEffect(() => {
    setState({ status: 'LOADING', results: [] });

    (async () => {
      try {
        const results = await mockFetch();
        setState({
          status: 'LOADED',
          results,
        });
      } catch(error) {
        setState({ status: 'ERROR', results: error.message })
      }
    })();
  }, [props.itemId]);

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  );
};

export default ItemDataProvider;
