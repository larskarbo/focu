import React, { Component, useState } from "react";
import { Grommet, Box, Button, Image, Grid, Text } from "grommet";

const PlayablePlaylist = ({
  name,
  description,
  albumSrc,
  minutes,
  onClick,
  running,
}) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <Box
      style={{
        cursor: "pointer",
        // border: active ? "px solid green" : "px solid #333847",
      }}
      className="playablePlaylist"
      background="white"
      margin={{
        vertical: "small",
      }}
      direction="row"
      onClick={() => {
        // setActive(true)
        // setTimeout(() => {
        onClick(name);
        // }, 500)
      }}
    >
      <img
        // className="grayScale"
        style={{
          width: 100,
          float: "left",
          filter: `grayscale(${running ? 1 : 0})`,
        }}
        src={albumSrc}
      />
      <div className="desc">
        <div className="title">{name}</div>

        {/* <div className="ddd">{description}</div> */}
      </div>
    </Box>
  );
};

export default PlayablePlaylist;
