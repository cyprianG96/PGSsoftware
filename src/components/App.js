import React, { Component } from "react";
import "./style.css";
import logo from "./img/logo.jpg";
import Song from "./Song";
import Error from "./Error";
import Pager from 'react-pager';

class App extends Component {

  state = {
    songs: [],
    value: "",
    error: false,
    current: 0,
    visiblePage: 1,
  };


  hanldeInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  clearSongs = () => {
    this.setState({
      songs: [],
      current: 0,
    });
  };

  handleSubmit = e => {
    fetch(
      `https://itunes.apple.com/search?term=${this.state.value}&entity=song`
    )
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Nie udało się pobrać danych!");
      })
      .then(response => response.json())

      .then(data => {
        if (data.results.length > 0) {
          this.setState({
            songs: data.results,
            error: false
          });
        } else {
          this.setState({
            songs: [],
            error: true
          });
        }
      });

    this.clearSongs();
  };

  handlePageChanged = (newPage) => {
    this.setState({ current: newPage });
  }

  render() {

    const { songs, current } = this.state

    const songsList = (songs.slice((current * 10), (this.state.current + 1) * 10 - 1)).map((song, index) => (
      <Song
        key={index}
        artistName={song.artistName}
        trackName={song.trackName}
        songs={this.state.songs}
        image={song.artworkUrl100}
      />
    ));
    return (
      <>
        <div className="wrapper">
          <header className="header">
            <img src={logo} className="logo" alt="" />
          </header>
          <section className="search">
            <h1>iTunes api example</h1>
            <label className="searchLabel" htmlFor="">
              <input
                type="text"
                value={this.state.value}
                onChange={this.hanldeInput}
                placeholder="Search songs..."
              />
              <button onClick={this.handleSubmit} className="searchBton">
                search
              </button>
              <p>
                Search by song title, author, song number, lyrics, catalog or
                copyright owner
              </p>
            </label>
          </section>
          {this.state.songs.length > 0 ? (<p className="matches">Found {this.state.songs.length} songs</p>) : ""}
          {this.state.error ? <Error /> : ""}
          <div className="wrapContent">
            {songsList}
            <Pager
              total={songs.length / 9}
              current={this.state.current}
              visiblePages={this.state.visiblePage}
              titles={{ first: '<|', last: '>|' }}
              className={songs.length > 2 ? "pagination" : "paginationOff"}
              onPageChanged={this.handlePageChanged}
            />
          </div>
          {/* <div
            className={this.state.songs.length < 9 ? "buttonsOff" : "buttons"}
          >
            <button>prev</button>
            <button>next</button>
          </div> */}
          <footer>
            <span className="lane">
              <p>Powered by PGS</p>
            </span>
          </footer>
        </div>
      </>
    );
  }
}

export default App;
