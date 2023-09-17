import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import App from "./App";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root")); // Use createRoot from "react-dom/client"
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      {" "}
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

export default client; // Export your Apollo Client instance as default
