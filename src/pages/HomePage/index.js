import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import Cabecalho from "../../components/Cabecalho";
import NavMenu from "../../components/NavMenu";
import Dashboard from "../../components/Dashboard";
import Widget from "../../components/Widget";
import TrendsArea from "../../components/TrendsArea";
import Tweet from "../../components/Tweet";
import { Modal } from "../../components/Modal";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      novoTweet: "",
      tweets: [],
      tweetAtivoNoModal: {},
    };
  }

  abreModal = (tweetQueVaiProModal) => {
    this.setState(
      {
        tweetAtivoNoModal: tweetQueVaiProModal,
      },
      () => {
        console.log(this.state.tweetAtivoNoModal);
      }
    );
  };

  fechaModal = () => this.setState({ tweetAtivoNoModal: {} });

  componentDidMount() {
    window.store.subscribe(() => {
      this.setState({
        tweets: window.store.getState(),
      });
    });

    fetch(
      `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem(
        "TOKEN"
      )}`
    )
      .then((response) => response.json())
      .then((tweets) => {
        window.store.dispatch({ type: "CARREGA_TWEETS", tweets });
      });
  }

  removeTweet(idTweetQueVaiSerRemovido) {
    console.log(idTweetQueVaiSerRemovido);
    fetch(
      `https://twitelum-api.herokuapp.com/tweets/${idTweetQueVaiSerRemovido}?X-AUTH-TOKEN=${localStorage.getItem(
        "TOKEN"
      )}`,
      {
        method: "DELETE",
      }
    )
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        const listaDeTweetsAtualizada = this.state.tweets.filter(
          (tweet) => tweet._id !== idTweetQueVaiSerRemovido
        );
        this.setState({
          tweets: listaDeTweetsAtualizada,
          tweetAtivoNoModal: {},
        });
      });
  }

  adicionaTweet = (infosDoEvento) => {
    infosDoEvento.preventDefault();
    if (this.state.novoTweet.length > 0) {
      fetch(
        `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem(
          "TOKEN"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ conteudo: this.state.novoTweet }),
        }
      )
        .then((respostaDoServer) => {
          return respostaDoServer.json();
        })
        .then((tweetVindoDoServidor) => {
          console.log(tweetVindoDoServidor);
          this.setState({
            tweets: [tweetVindoDoServidor, ...this.state.tweets],
          });
        });
    }
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Twitelum - ({`${this.state.tweets.length}`})</title>
        </Helmet>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span
                    className={`novoTweet__status
${this.state.novoTweet.length > 140 ? "novoTweet__status--invalido" : ""}
`}
                  >
                    {this.state.novoTweet.length}/140
                  </span>
                  <textarea
                    className="novoTweet__editor"
                    value={this.state.novoTweet}
                    onChange={(event) =>
                      this.setState({ novoTweet: event.target.value })
                    }
                    placeholder="O que está acontecendo?"
                  ></textarea>
                </div>
                <button
                  className="novoTweet__envia"
                  disabled={
                    this.state.novoTweet.length > 140 ||
                    this.state.novoTweet.length === 0
                  }
                  type="submit"
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.state.tweets.map((tweetInfo, index) => {
                  return (
                    <Tweet
                      key={tweetInfo._id}
                      id={tweetInfo._id}
                      texto={tweetInfo.conteudo}
                      usuario={tweetInfo.usuario}
                      likeado={tweetInfo.likeado}
                      totalLikes={tweetInfo.totalLikes}
                      removivel={tweetInfo.removivel}
                      onClickNaAreaDeConteudo={() => this.abreModal(tweetInfo)}
                      removeHandler={() => this.removeTweet(tweetInfo._id)}
                    />
                  );
                })}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          isAberto={Boolean(this.state.tweetAtivoNoModal._id)}
          onFechando={this.fechaModal}
        >
          {() => (
            <Tweet
              id={this.state.tweetAtivoNoModal._id}
              usuario={this.state.tweetAtivoNoModal.usuario}
              texto={this.state.tweetAtivoNoModal.conteudo}
              totalLikes={this.state.tweetAtivoNoModal.totalLikes}
              removivel={this.state.tweetAtivoNoModal.removivel}
              removeHandler={() =>
                this.removeTweet(this.state.tweetAtivoNoModal._id)
              }
              likeado={this.state.tweetAtivoNoModal.likeado}
              likes={this.state.tweetAtivoNoModal.likes}
            />
          )}
        </Modal>
      </Fragment>
    );
  }
}

export default HomePage;
