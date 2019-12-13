import React from "react";
import "./Overlay.scss";

import { images } from "../sotu_tfidf.js";

const buttonStyle = {
  margin: "10px 10px 10px 0",
  background: "white",
  color: "black",
  border: "2px solid black",
  fontSize: "16px"
};

const overlayImgStyle = {
  width: "30%",
  height: "auto"
};

const formatDate = date => {
  const dateObj = new Date(date + "T00:00:00");
  return new Intl.DateTimeFormat("en-US").format(dateObj);
};

const Overlay = props => {
  console.log(props);
  let presName = props.details.President;
  let date = props.details.Date;

  let summary = props.details.Summary;
  let image = props.details.image;
  summary = summary.replace("[", "");
  summary = summary.replace("]", "");

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

  return (
    <div className="overlay">
      <h1>{presName}</h1>
      <img style={overlayImgStyle} src={image} alt={presName}></img>
      <br />
      <Button
        onClick={() => {
          setOverlay(null);
        }}
      ></Button>
      <h2>State of the Union Address from {formatDate(date)}</h2>
      <h3>Summary of SOTU Address using the LexRank method:</h3>
      <p className="speechText">{summary}</p>
    </div>
  );
};

export default Overlay;
