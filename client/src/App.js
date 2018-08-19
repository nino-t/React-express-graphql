import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import MainLayout from './Layouts/Main'

import Contacts from './Contacts'

const client = new ApolloClient()

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainLayout>
          <div className="container">
            <Contacts />
          </div>
        </MainLayout>
      </ApolloProvider>
    );
  }
}

export default App;
