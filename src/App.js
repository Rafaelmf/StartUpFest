import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Firebase from './dataSource/fireBase';
import Routes from './routes/Routes';

const client = new ApolloClient({
  uri: 'https://startups-project-mytvsxrgeb.now.sh',
});

function App() {
  // Basic structure for using firebase database
  Firebase.database()
    .ref('/users')
    .once('value')
    .then((snapshot) => {
      console.log('values', snapshot.val());
    });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
