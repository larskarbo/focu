import React, { Component, useState } from "react";
import { Grommet, Box, Button, Image, Text, CheckBox } from "grommet";
import { FaSpotify, FaMusic } from "react-icons/fa";
const secToReadable = (sec) => {
  var minutes = (Math.floor(sec / 60) + "").padStart(2, "0");
  var seconds = ((sec % 60) + "").padStart(2, "0");
  // seconds = Math.floor(seconds)

  return `${minutes}:${seconds}`;
};

const TimePicker = ({ running, onStart, ready, onPause, seconds, errored }) => {
  const [focusSong, setFocusSong] = useState(focusSongs[0]);
  const [time, setTime] = useState(times[3]);
  const [active, setActive] = useState(false);
  const [sound, setSound] = useState(sounds[0]);
  const [celebrateSong, setCelebrateSong] = useState(celebrateSongs[0]);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  if (loading && errored) {
    console.log("errored!");
    setLoading(false);
    setLoadingProgress(0);
  }

  if (loading && running) {
    setLoading(false);
    setLoadingProgress(1);
  }

  const start = async (opts) => {
    setShowLoading(true);
    await new Promise((r) => setTimeout(r, 1));
    setLoading(true);
    setLoadingProgress(0.8);
    await onStart(opts);
  };
  return (
    <div className={`picker ${active && "active"}`} direction="row" style={{}}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: `${loadingProgress * 100}%`,
          background: "#0a1a00",
          zIndex: 0,
          opacity: showLoading ? 1 : 0,
          transition: "width 1s, opacity 1.3s",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: `${(seconds / (time.value * 60)) * 100}%`,
          background: "#0c830c",
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          position: "relative",
        }}
      >
        <div className="textyo">
          Listen to{" "}
          <Choose
            disabled={running}
            options={focusSongs}
            value={focusSong}
            onChange={setFocusSong}
            icon={focusSong.value && <FaSpotify size={20} />}
          />
          <br />
          for{" "}
          <Choose
            disabled={running}
            options={times}
            value={time}
            onChange={setTime}
          />
          . <br />
          Then play{" "}
          <Choose
            disabled={running}
            options={sounds}
            value={sound}
            onChange={setSound}
          />
          <br />
          and{" "}
          <Choose
            disabled={running}
            options={celebrateSongs}
            value={celebrateSong}
            onChange={setCelebrateSong}
            icon={celebrateSong.value && <FaSpotify size={20} />}
          />
          .
        </div>
        {running && (
          <div
            style={{
              fontSize: 100,
              marginBottom: 10,
              marginTop: 0,
            }}
          ></div>
        )}
        <div
          className="clickfucker"
          onClick={
            running
              ? onPause
              : () =>
                  start({
                    focusSong: focusSong.value,
                    time: time.value,
                    sound: sound.value,
                    celebrateSong: celebrateSong.value,
                  })
          }
          onMouseDown={(e) => {
            setActive(true);
            window.addEventListener("mouseup", (e) => {
              setActive(false);
            });
          }}
        >
          {running ? (
            <>
              <div>
                <FaMusic /> {secToReadable(seconds)}
              </div>
              <div>Keep this tab open.</div>
            </>
          ) : ready ? (
            <div>▶ Tap to start</div>
          ) : (
            <div> - Spotify connection required - </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Choose = ({ value, icon, options, onChange, disabled }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <span
        onClick={(e) => {
          if (disabled) {
            return;
          }
          if (!active) {
            setTimeout(() => {
              const d = () => {
                console.log("setActive(false)");
                setActive(false);
                window.removeEventListener("click", d);
              };
              window.addEventListener("click", d);
            }, 10);
          }
          setActive(!active);
        }}
        className="Choose"
        style={{
          color: icon ? "#57cb0f" : "white",
          background: active ? "#4c4c4c" : "none",
        }}
      >
        {icon}
        {icon ? " " : ""}
        <span>{value.label}</span>{" "}
        {!disabled && <span className="arrow">▼</span>}
        {active && (
          <div className="hey">
            {options.map((o) => (
              <button
                key={o.label}
                onClick={() => onChange(o)}
                style={{
                  background: value == o ? "#e6e6e6" : "white",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </span>
    </>
  );
};

export default TimePicker;

const sounds = [
  {
    label: "👏 applause",
    value: "applause.mp3",
  },
  {
    label: "☎️ beep-beep",
    value: "beep-beep.mp3",
  },
  {
    label: "🛁 bubbles",
    value: "bubbles.mp3",
  },
  {
    label: "nothing",
    value: null,
  },
];

let times = [5, 10, 15, 25, 45, 60];
times = times.map((a) => {
  return {
    label: a + " min",
    value: a,
  };
});

const focusSongs = [
  {
    label: "Lofi-mix",
    value: { uri: "spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM" },
  },
  {
    label: "Deep focus",
    value: { uri: "spotify:playlist:37i9dQZF1DWZeKCadgRdKQ" },
  },
  {
    label: "Bineural beats",
    value: { uri: "spotify:playlist:37i9dQZF1DX7EF8wVxBVhG" },
  },
  {
    label: "nothing",
    value: null,
  },
];

const celebrateSongs = [
  {
    label: "Celebration",
    value: { uri: "spotify:track:3K7Q9PHUWPTaknlbFPThn2" },
  },
  {
    label: "Mr. Blue Sky",
    value: { uri: "spotify:track:5IrtNw1BTSo4dbZ4ZO5bPx" },
  },
  {
    label: "We are the champions",
    value: { uri: "spotify:track:1lCRw5FEZ1gPDNPzy1K4zW", seek: 29800 },
  },
  {
    label: "nothing",
    value: null,
  },
];
