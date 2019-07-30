import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Routes from './routes/Routes';

// Apollo configuration with Uri used on queries and mutations
const client = new ApolloClient({
  uri: 'https://startups-project-mytvsxrgeb.now.sh',
});

function App() {
  return (
    // Used ApolloProvider as a HOC providing Apollo Client as props for
    // all children components from aplication
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
