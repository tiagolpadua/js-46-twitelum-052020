import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/btn.css";
import "./assets/css/container.css";
import "./assets/css/icon.css";
import "./assets/css/iconHeart.css";
import "./assets/css/notificacao.css";
import "./assets/css/novoTweet.css";
// CSSs Globais
import "./assets/css/reset.css";
import Roteamento from "./routes";
import * as serviceWorker from "./serviceWorker";
import { NotificacaoContextProvider } from "./contexts/NotificacaoContext";

ReactDOM.render(
  <NotificacaoContextProvider>
    <BrowserRouter>
      <Roteamento />
    </BrowserRouter>
  </NotificacaoContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
