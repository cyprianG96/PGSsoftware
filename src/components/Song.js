import React, { Component } from "react";
import song from "./img/song.png";

const Song = props => {
  var trackName = props.trackName;

  return (
    <>
      <section className={props.songs.length > 2 ? "descriptions" : "descriptionsTwice"}>
        <img src={song} alt="" />
        <div className="descriptionSong">
          <h1>{props.artistName}</h1>
          <p>
            {trackName.length >= 25
              ? (`${trackName = trackName.substring(0, 25)}...`)
              : trackName}
          </p>
        </div>
      </section>
    </>
  );
};

export default Song;
