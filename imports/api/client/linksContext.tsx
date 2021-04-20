// context provider that can be imported to any component that needs the data
import React from 'react';

const LinksContext = React.createContext({});

export const LinksProvider = LinksContext.Provider;

export default LinksContext;
