import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";

const modalText = {
  fontFamily: "Georgia",
  textAlign: "center",
  fontSize: "20px"
};

class Dashboard extends Component {
  state = { show: true };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main>
        {/* <h1>State Of The Union Addresses</h1> */}
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p style={modalText}>
            Enter to view every State of the Union Address clustered according
            to the transcript similarity.
            <br /> Click on a President's image to view the corresponding State
            of the Union
          </p>
        </Modal>
        {/* <button type="button" onClick={this.showModal}>
          Open
        </button> */}
      </main>
    );
  }
}
export default Dashboard;
// const container = document.createElement("div");
// document.body.appendChild(container);
// ReactDOM.render(<Dashboard />, container);
