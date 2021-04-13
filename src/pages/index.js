import { Link } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import App from "../app/App";
import SEO from "../templates/seo";

function Index() {
  return (
    <div className="flex flex-col pt-0 to-yellow-50 min-h-screen">
      <Helmet>
        <meta property="og:url" content="https://focusmonkey.io/" />
        <link rel="canonical" href="https://focusmonkey.io/" />
      </Helmet>

      <SEO />

      <App />

      <div className="my-8 font-light text-white w-full text-center underline text-sm">
        <Link to="/best-focus-timer-for-spotify/">
          The best focus timer for Spotify
        </Link>
      </div>
    </div>
  );
}

export default Index;
