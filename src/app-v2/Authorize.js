import { Box, Image } from "grommet";
import React from "react";
import connect from "./connect.png";
import { PARSE_SERVER_BASE } from "./Monkey";

const Authorize = ({ spotify }) => {
  let content;

  if (!spotify.credentials) {
    content = (
      <div>
        <div style={{ fontSize: 14, marginBottom: 6 }}>
          Hello 👋
          <br />
          Please connect to Spotify in order to get started. <br />
          PS: Spotify Premium required{" "}
        </div>
        <Image
          width="200px"
          onClick={(a) => {
            window.open(PARSE_SERVER_BASE + "/login", "_self");
          }}
          src={connect}
        ></Image>
      </div>
    );
  }

  if (spotify.ready) {
    return null;
  }
  return (
    <Box
      className="Authorize"
      style={{
        marginBottom: 30,
        backgroundColor: "#333333",
        padding: 24,
      }}
    >
      {/* {spotify.loading &&
				<div>Loading</div>
			} */}
      {content}
    </Box>
  );
};

export default Authorize;
