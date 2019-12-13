import "./Modal.scss";
import React from "react";

const buttonStyle = {
  margin: "10px 10px 10px 0",
  background: "none",
  color: "black",
  border: "2px solid black",
  fontSize: "16px",
  marginLeft: "50%"
};

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button style={buttonStyle} onClick={handleClose}>
          Enter
        </button>
      </section>
    </div>
  );
};

export default Modal;
