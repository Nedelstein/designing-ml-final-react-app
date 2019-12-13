import React, { useState, useRef, useEffect } from "react";
import Overlay from "./components/Overlay";

import "./App.css";
import * as PIXI from "pixi.js";

import { Viewport } from "pixi-viewport";
// import ReactAudioPlayer from "react-audio-player";

// import * as fs from "file-system";

import { images, positions } from "./sotu_tfidf.js";
// const soundFolder = "./sounds/";
console.log(images);

// let positions;

let displayImg;

// let eagle1 = soundFolder + "eagle1.mp3";
// let eagle2 = soundFolder + "eagle2.mp3";
// let eagle3 = soundFolder + "eagle3.mp3";
// let eagles = [eagle1, eagle2, eagle3];

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

    app.renderer.backgroundColor = "black";
    // interaction plugins
    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();

    app.loader.load((loader, resources) => {
      // let player = document.createElement("audio");
      // let sound = eagles[Math.floor(Math.random() * eagles.length)];
      //loop through SOTU addresses

      // const topGroup = new PIXI.display.Group(1, true);
      // const bottomGroup = new PIXI.display.Group(100, true);

      for (let key in positions) {
        // console.log("working");

        const president = positions[key]["President"];

        const imageSprite = new PIXI.Sprite(resources[president].texture);

        // imageSprite.parentGroup = bottomGroup;

        imageSprite.height *= 0.3;
        imageSprite.width *= 0.3;
        const cluster_pos = positions[key].Cluster_Pos;

        imageSprite.x = 3 * app.renderer.width * (cluster_pos[0] * 2 - 1);
        imageSprite.y = 3 * app.renderer.height * (cluster_pos[1] * 2 - 1);

        // console.log(imageSprite.x, imageSprite.y);

        imageSprite.anchor.x = 0.5;
        imageSprite.anchor.y = 0.5;
        imageSprite.interactive = true;

        // imageSprite.player = document.createElement("audio");
        // imageSprite.player.src = eagle1;

        const name = key;
        // console.log(images[name].image);
        imageSprite.zIndex = 0;
        console.log(imageSprite);

        imageSprite.on("click", () => {
          setOverlay(positions[name]);
          // imageSprite.player.play();
        });

        imageSprite.on("mouseover", () => {
          imageSprite.height = imageSprite.height * 1.2;
          imageSprite.width = imageSprite.width * 1.2;

          // imageSprite.zOrder += 100;
          // console.log(imageSprite._zIndex);
          // imageSprite.parentGroup = topGroup;
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
