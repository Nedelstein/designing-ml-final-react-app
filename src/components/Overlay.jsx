import React from "react";
import "./Overlay.scss";

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
  let presImg =
    "https://raw.githubusercontent.com/Nedelstein/designing-ml-final-react-app/master/" +
    props.details.image;
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

  return (
    <div className="overlay">
      <h1>{presName}</h1>
      <img
        style={overlayImgStyle}
        src={presImg}
        alt="img of president supposed to be here"
      ></img>
      <br />
      <Button
        onClick={() => {
          setOverlay(null);
        }}
      ></Button>
      <h2>State of the Union Address from {formatDate(date)}</h2>
      <p className="speechText">{transcript}</p>
    </div>
  );
};

export default Overlay;
