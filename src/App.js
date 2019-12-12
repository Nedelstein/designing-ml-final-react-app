import React, { useState, useRef, useEffect } from "react";
import Overlay from "./components/Overlay";
import "./App.css";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

import * as fs from "file-system";

import { images, positions } from "./sotu_tfidf.js";
// const soundFolder = "../public/sounds/";

import eagle1 from "./sounds/eagle1.mp3";
import eagle2 from "./sounds/eagle2.mp3";
import eagle3 from "./sounds/eagle3.mp3";

console.log(images);

// let positions;

let displayImg;

const hoverSound = () => {
  // let eagle1 = soundFolder + "eagle1.mp3";
  // let eagle2 = soundFolder + "eagle2.mp3";
  // let eagle3 = soundFolder + "eagle3.mp3";
  let eagles = [eagle1, eagle2, eagle3];

  let sound = eagles[Math.floor(Math.random() * eagles.length)];
  // let audio = new Audio(sound);
  let audio = document.getElementById();
  console.log(sound);
  audio.play();
};

function App() {
  // const canvas = useRef(null);
  const [overlay, setOverlay] = useState(null);

  // load custer pos onto canvas
  useState(() => {
    console.log("positions: ", positions);
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
      // view: canvas.current
    });
    document.body.appendChild(app.view);

    let positionDict = {};

    for (let i in images) {
      displayImg =
        "https://raw.githubusercontent.com/Nedelstein/designing-ml-final-react-app/master/public/" +
        images[i]["image"];
      app.loader.add(images[i]["President"], displayImg);
      for (let j = 0; j < positions.length; j++) {
        if (positions[j].President === images[i].President) {
          positions[j].image = displayImg;
        }
      }
    }

    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: positions.length,
      worldHeight: positions.length,
      interaction: app.renderer.plugins.interaction
    });

    viewport.moveCorner(-1300, -1300);

    // add viewport to stage
    app.stage.addChild(viewport);

    // app.stage.position.x = viewport.width / 2;
    // app.stage.position.y = viewport.height / 2;

    app.renderer.backgroundColor = "black";
    // interaction plugins
    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();

    app.loader.load((loader, resources) => {
      //loop through SOTU addresses
      for (let key in positions) {
        // console.log("working");

        const president = positions[key]["President"];

        const imageSprite = new PIXI.Sprite(resources[president].texture);

        imageSprite.height *= 0.4;
        imageSprite.width *= 0.4;

        const cluster_pos = positions[key].Cluster_Pos;

        imageSprite.x = 4 * app.renderer.width * (cluster_pos[0] * 2 - 1);
        imageSprite.y = 4 * app.renderer.height * (cluster_pos[1] * 2 - 1);

        // console.log(imageSprite.x, imageSprite.y);

        imageSprite.anchor.x = 0.5;
        imageSprite.anchor.y = 0.5;

        imageSprite.interactive = true;

        const name = key;
        // console.log(images[name].image);

        imageSprite.on("click", () => {
          setOverlay(positions[name]);
        });

        imageSprite.on("mouseover", () => {
          imageSprite.height = imageSprite.height * 1.2;
          imageSprite.width = imageSprite.width * 1.2;

          // hoverSound();
        });

        imageSprite.on("mouseout", () => {
          imageSprite.height = imageSprite.height / 1.2;
          imageSprite.width = imageSprite.width / 1.2;
        });

        viewport.addChild(imageSprite);
      }
    });
  });
  return (
    <div className="App">
      {/* <canvas ref={canvas}></canvas> */}
      {overlay && <Overlay details={overlay} setOverlay={setOverlay} />}
    </div>
  );
}

export default App;
