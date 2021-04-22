// context provider that can be imported to any component which needs reactive data from the Mobx store
import React from 'react';

const StoreContext = React.createContext({});

export const StoreProvider = StoreContext.Provider;

export default StoreContext;
