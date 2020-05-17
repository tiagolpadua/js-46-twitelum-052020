import React, { Component, Fragment } from "react";
import Cabecalho from "./components/Cabecalho";
import "./App.css";
import NavMenu from "./components/NavMenu";
class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        Resto da página que ainda iremos adicionar
      </Fragment>
    );
  }
}
export default App;
