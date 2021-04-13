import React, { useCallback, useContext } from "react";
// import firebase from "firebase/app";
import Helmet from "react-helmet"


// lag dei 1220 x 630

function SEO({
  title="FocusMonkey - Focus Timer with Music"
}) {
  const description = "World's smartest focus timer with automatic sync to Spotify. Play the happy reward song when you are done 👏"
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta property="og:image" content="https://focusmonkey.io/preview.png" />
      <meta name="twitter:image" content="https://focusmonkey.io/preview.png" />
      
      <meta property="og:site_name" content="FocusMonkey" />
      <meta name="twitter:card" content="summary_large_image" />


      <meta
        name="twitter:creator"
        content={"larskarbo"}
      />
    </Helmet>
  );
}


export default SEO;
