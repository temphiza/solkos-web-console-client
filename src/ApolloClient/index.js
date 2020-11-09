import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
    uri: 'http://127.0.0.1:8000',
    cache: new InMemoryCache()
});
