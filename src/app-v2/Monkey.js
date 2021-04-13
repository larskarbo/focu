import * as firebase from "firebase/app";
import { Box } from "grommet";
import { Howl } from "howler";
import React from "react";
import Authorize from "./Authorize";
import DeviceSelector from "./DeviceSelector";
import Feedback from "./Feedback";
import TimePicker from "./TimePicker";
import Timer from "./utils/Timer";

// export const PARSE_SERVER_BASE = "http://localhost:1337";
export const PARSE_SERVER_BASE = "https://server.focusmonkey.io";

const Container = ({ children }) => (
  <div style={{ height: "100vh", width: "100%" }}>{children}</div>
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      playables: [],
      noactivedevice: false,
      seconds: 0,
      running: false,
      custmusic: false,
      errored: false,
      spotify: props.spotify,
    };

    this.s = this.state.spotify.s;

    this.s.setOnError(this.onError);
    console.log("this.state.token: ", this.state.token);

    this.state.spotify.onUpdateState = () => {
      this.setState({
        spotify: this.props.spotify,
      });
    };
  }

  onError = (error) => {
    console.log(error);
    console.log("Invalid access token");
    firebase.analytics().logEvent("api-error", { error });
    if (error.includes("Invalid access token")) {
      this.state.spotify.logOut();
    } else {
      console.error("UNHANDLED ERROR:", error);
    }
  };

  componentDidMount() {}

  autoSetDevice = async () => {
    if (!this.state.spotify.devices.some((d) => d.is_active)) {
      // no active, set first

      if (this.state.spotify.playerId) {
        await this.s.transferMyPlayback([this.state.spotify.playerId]);
      } else {
        await this.s.transferMyPlayback([this.state.spotify.devices[0].id]);
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
  };

  startTimer = async (opts) => {
    if (this.startInProgress) {
      return;
    }
    this.setState({
      errored: false,
    });
    firebase.analytics().logEvent("start_timer");
    this.startInProgress = true;
    if (this.state.spotify.devices.length == 0) {
      // no devices!
      alert("Please start spotify on one of your devices first");
      this.startInProgress = false;
      return;
    }
    try {
      await this.autoSetDevice();
      await this.s.setShuffle(true);
      console.log(await this.s.getMyCurrentPlaybackState());
      if (opts.focusSong) {
        await this.play(opts.focusSong);
      }
      await this.s.skipToNext();
    } catch (e) {
      alert(
        "Got an error! You might have to check which spotify device is selected as playback. Try playing some music with the spotify app, and then start FocusMonmkey.\n\n" +
          e.message +
          JSON.stringify(e)
      );
      this.startInProgress = false;
      this.setState({
        errored: true,
      });
      return;
    }
    console.log("🏋️‍♂️🏋️‍♂️🏋️‍♂️🏋️‍♂️POT");

    this.startInProgress = false;
    this.setState({
      running: true,
    });
    this.timer = new Timer(opts.time * 60 * 1000)
      .progress((progress, time) => {
        const seconds = Math.floor(time / 1000);
        this.setState({ seconds });
      })
      .finish(async (a) => {
        console.log("a", a);

        firebase.analytics().logEvent("end_timer");
        this.setState({
          running: false,
          seconds: 0,
        });
        if (opts.sound) {
          var sound = new Howl({
            src: ["/" + opts.sound],
          });
          sound.play();
          this.pause();
          await new Promise((r) => setTimeout(r, 1500));
        }

        if (opts.celebrateSong) {
          this.play(opts.celebrateSong);
        } else {
          this.pause();
        }
      });
  };

  pauseTimer = () => {
    if (this.timer.paused) {
      this.timer.resume();
      this.s.play();
    } else {
      this.timer.pause();
      this.pause();
    }
  };

  play = async (songObj) => {
    const { uri, seek } = songObj;
    console.log("uri: ", uri);
    try {
      if (uri.includes("playlist")) {
        const h = await this.s.play({
          context_uri: uri,
        });
      } else if (uri.includes("track")) {
        const h = await this.s.play({
          uris: [uri],
          position_ms: seek,
        });
      } else {
        console.error("what", uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  pause = () => {
    this.s.pause();
  };

  render() {
    if (
      !this.state.spotify.ready &&
      this.state.spotify.credentials &&
      this.state.playables
    ) {
      return <div>loading...</div>;
    }
    return (
      <div style={{ width: "100%" }}>
        <Authorize spotify={this.state.spotify} />

        <TimePicker
          onPause={this.pauseTimer}
          seconds={this.state.seconds}
          running={this.state.running}
          ready={this.state.spotify.ready}
          onStart={this.startTimer}
          errored={this.state.errored}
        />

        <Box pad="small"></Box>

        {this.state.spotify.credentials && (
          <DeviceSelector spotify={this.state.spotify} />
        )}
        <div style={{ padding: 25 }}></div>

        <div style={{ padding: 50 }}></div>
      </div>
    );
  }
}

export default Main;
