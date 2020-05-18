import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// Páginas
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

class PrivateRoute extends React.Component {
  estaAutenticado = () => {
    if (localStorage.getItem("TOKEN")) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { component: Component, ...props } = this.props;
    if (this.estaAutenticado()) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

class Roteamento extends React.Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
      </Switch>
    );
  }
}
export default Roteamento;
