import React, { useState } from "react";
import Overlay from "./components/Overlay";

import "./App.css";
import * as PIXI from "pixi.js";

import { Viewport } from "pixi-viewport";

import { images, positions } from "./sotu_tfidf.js";
// const soundFolder = "../public/sounds/";
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
      // let sound = "../public/sounds/eagle3.mp3";
      // let sound = eagles[Math.floor(Math.random() * eagles.length)];
      // console.log(eagle3);
      // let audio = new Audio(eagle2);
      //loop through SOTU addresses

      for (let key in positions) {
        // console.log("working");

        const president = positions[key]["President"];

        const imageSprite = new PIXI.Sprite(resources[president].texture);

        imageSprite.height *= 0.3;
        imageSprite.width *= 0.3;
        const cluster_pos = positions[key].Cluster_Pos;

        imageSprite.x = 5 * app.renderer.width * (cluster_pos[0] * 2 - 1);
        imageSprite.y = 5 * app.renderer.height * (cluster_pos[1] * 2 - 1);

        imageSprite.anchor.x = 0.5;
        imageSprite.anchor.y = 0.5;
        imageSprite.interactive = true;

        const name = key;
        // console.log(images[name].image);
        imageSprite.zIndex = 0;

        imageSprite.on("click", () => {
          setOverlay(positions[name]);
          // imageSprite.player.play();
          // audio.play();
          // player.play(sound);
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
