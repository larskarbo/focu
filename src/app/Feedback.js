import React from "react";
import NetlifyForm from "react-netlify-form";

export default () => {
  return (
    <div className="feedback">
      <p>Thanks for using FocusMonkey! We hope you found it useful.</p>

      <a
        href="https://www.producthunt.com/posts/focusmonkey?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-focusmonkey"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=218198&theme=light"
          alt="FocusMonkey - Next-gen focus timer with adaptive music using Spotify | Product Hunt Embed"
          style={{
            width: 250,
            height: 54,
          }}
          width="250px"
          height="54px"
        />
      </a>

      <h2>Newsletter 💌</h2>
      <p>We have some cool ideas coming up, stay in the loop:</p>
      <NetlifyForm name="newsletter">
        {({ loading, error, success }) => (
          <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error. Please try again later.</div>}
            {success && <div>Thank you for subscribing!</div>}
            {!loading && !success && (
              <div>
                <p>
                  <input type="email" name="email" placeholder="Email" />
                </p>
                <p>
                  <button type="submit">Subscribe</button>
                </p>
              </div>
            )}
          </div>
        )}
      </NetlifyForm>

      <h2>Feedback 👋</h2>
      <NetlifyForm name="contact">
        {({ loading, error, success }) => (
          <div>
            {loading && <div>Loading...</div>}
            {error && (
              <div>Your information was not sent. Please try again later.</div>
            )}
            {success && <div>Thank you for the feedback!</div>}
            {!loading && !success && (
              <div>
                <p>
                  <input type="name" name="name" placeholder="Name" />
                </p>
                <p>
                  <input type="email" name="email" placeholder="Email" />
                </p>
                <p>
                  <textarea name="message" placeholder="Write here ..." />
                </p>
                <p>
                  <button type="submit">Send</button>
                </p>
              </div>
            )}
          </div>
        )}
      </NetlifyForm>
      <br />
      <a href="https://www.buymeacoffee.com/larskarbo" target="_blank">
        <img
          src="https://cdn.buymeacoffee.com/buttons/default-black.png"
          alt="Buy Us A Coffee"
          style={{
            // height: "51px !important",
            width: 160,
          }}
        />
      </a>
    </div>
  );
};
