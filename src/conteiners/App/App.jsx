import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { store } from "../../store/index";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import AuthForm from "./../../components/AuthForm/AuthForm";
import RegForm from "./../../components/RegForm/RegForm";
import ProcForm from "./../../components/ProcForm/ProcForm";
import UpdateForm from "./../../components/UpdateForm/UpdateForm";

const httpLink = createHttpLink({
  uri: "https://fakerql.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  // получаем сохраненный токен из localStorage
  const token = localStorage.getItem("token");
  // возвращаем новые заголовки
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/" component={AuthForm} />
              <Route exact path="/reg" component={RegForm} />
              <Route exact path="/update" component={UpdateForm} />
              <Route exact path="/proc" component={ProcForm} />
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
