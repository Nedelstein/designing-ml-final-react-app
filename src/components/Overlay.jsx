import React from "react";
import "./Overlay.scss";
// import Button from "./Button.jsx";
// import { formatDate } from "tough-cookie";

const buttonStyle = {
  margin: "10px 10px 10px 0",
  background: "white",
  color: "black",
  border: "2px solid black",
  fontSize: "16px"
};

const Overlay = props => {
  console.log(props);
  let presName = props.details.President;
  let date = props.details.Date;
  let presImg = props.details.image;
  let transcript = props.details.Speech;
  const setOverlay = props.setOverlay;

  let Button = () => {
    return (
      <button
        style={buttonStyle}
        onClick={() => {
          setOverlay(null);
        }}
      >
        Close
      </button>
    );
  };

  const formatDate = date => {
    const dateObj = new Date(date + "T00:00:00");
    return new Intl.DateTimeFormat("en-US").format(dateObj);
  };
  return (
    <div className="overlay">
      <h1>{presName}</h1>
      <img src={presImg}></img>
      <br />
      <Button
        onClick={() => {
          setOverlay(null);
        }}
      ></Button>
      <h2>State of the Union Address from {formatDate(date)}</h2>
      <p1>{transcript}</p1>
    </div>
  );
};

export default Overlay;
