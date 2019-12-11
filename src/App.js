import React, { useState, useRef, useEffect } from "react";
import Overlay from "./components/Overlay";
import "./App.css";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

import { images, positions } from "./sotu_umap.js";

console.log(images);

// let positions;

function App() {
  // const canvas = useRef(null);
  const [overlay, setOverlay] = useState(null);

  // load custer pos onto canvas
  useState(() => {
    console.log(positions);
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
      // view: canvas.current
    });
    document.body.appendChild(app.view);

    let positionDict = {};

    // make photo lookup and tie it to sotu json object
    //loop through photo lookup and load image keyed to pres name

    // for (let i = 0; i < positions.length; i++) {
    //   for (let j = 0; j < images.length; j++) {
    //     const presName = positions[i].President;
    //     const date = positions[i].Date;
    //     const image = images[j].image;
    //     const name = image.replace(".jpg", "");

    //     // const filename = image.replace(".jpg", "");

    //     //add image value to position object
    //     if (presName === images[j].President) {
    //       positions[i].image = image;
    //     }

    //     const displayImg =
    //       "https://raw.githubusercontent.com/Nedelstein/designing-ml-final-react-app/master/" +
    //       positions[i].image;

    //     // why do i need this here?????
    //     app.loader.reset();

    //     app.loader.add(name, displayImg);

    //     // console.log("name: ", name);
    //     positionDict[name] = positions[i];
    //   }
    // }

    for (let i in images) {
      const displayImg =
        "https://raw.githubusercontent.com/Nedelstein/designing-ml-final-react-app/master/" +
        images[i]["image"];
      app.loader.add(images[i]["President"], displayImg);
    }

    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: positions.length,
      worldHeight: positions.length,
      interaction: app.renderer.plugins.interaction
    });

    // add viewport to stage
    app.stage.addChild(viewport);

    app.renderer.backgroundColor = 0xff00cc;
    // interaction plugins
    viewport
      .drag()
      .pinch()
      // .wheel()
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

        imageSprite.x = app.renderer.width * (cluster_pos[0] * 2 - 1);
        imageSprite.y = app.renderer.height * (cluster_pos[1] * 2 - 1);

        console.log(imageSprite.x, imageSprite.y);

        imageSprite.anchor.x = 0.5;
        imageSprite.anchor.y = 0.5;

        imageSprite.interactive = true;

        const name = key;
        imageSprite.on("click", () => {
          setOverlay(positions[name]);
        });

        imageSprite.on("mouseover", () => {
          imageSprite.height = imageSprite.height * 1.2;
          imageSprite.width = imageSprite.width * 1.2;
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
