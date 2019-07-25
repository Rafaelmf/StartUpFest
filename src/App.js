import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ALL_SEGMENTS } from './dataSource/requests';

import Routes from './routes/Routes';

const client = new ApolloClient({
  uri: 'https://startups-project-mytvsxrgeb.now.sh',
});

function App() {
  client
    .query({
      query: ALL_SEGMENTS,
    })
    .then(result => console.log(result));
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
