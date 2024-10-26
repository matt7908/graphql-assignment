import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ApolloProvider from './graphql/ApolloProvider';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
