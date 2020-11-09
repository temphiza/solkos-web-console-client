import React from 'react';
import './App.less';
import {ApolloProvider} from '@apollo/client';
import client from './ApolloClient';
import Admin from "./Pages/Shells/Admin";
// import Login from "./Pages/Auth/Login";

// import Customer from "./Pages/Shells/Customer";

function App() {
    return (
        <ApolloProvider client={client}>
            <Admin/>
        </ApolloProvider>
    );
}

export default App;
