import React, { Component } from "react";
import song from "./img/song.png";

const Song = props => {
  var trackName = props.trackName;
  var artistName = props.artistName;
  var image = props.image

  return (
    <>
      <section className={props.songs.length > 2 ? "descriptions" : "descriptionsTwice"}>
        <img src={image} alt="" />
        <div className="descriptionSong">
          <h1>{artistName.length >= 25
            ? (`${artistName = artistName.substring(0, 25)}...`)
            : artistName}</h1>
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
