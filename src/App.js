import React, { useState, useRef, useEffect } from "react";
import Overlay from "./components/Overlay";
import "./App.css";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

import { images, positions } from "./sotu_umap.js";

// let positions;

function App() {
  const canvas = useRef(null);
  const [overlay, setOverlay] = useState(null);

  // load custer pos onto canvas
  useEffect(() => {
    console.log(positions);
    // console.log(images);
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      view: canvas.current
    });
    document.body.appendChild(app.view);

    let positionDict = {};

    // make photo lookup and tie it to sotu json object
    //loop through photo lookup and load image keyed to pres name
    const lincoln =
      "https://raw.githubusercontent.com/Nedelstein/designing-ml-final-react-app/master/resized/resized_president_imgs_01-washington.jpg";

    app.loader.add("Lincoln", lincoln);
    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < images.length; j++) {
        const presName = positions[i].President;
        const date = positions[i].Date;
        const image = images[j].image;

        //add image value to position object
        if (presName == images[j].President) {
          positions[i].image = image;
        }

        app.loader.add(presName);

        positionDict[presName] = positions[i];
      }
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
      .wheel()
      .decelerate();

    app.loader.load((loader, resources) => {
      // console.log(resources);
      console.log("app dims:", app.renderer.width, app.renderer.height);
      // console.log(app.renderer.backgroundColor);

      //this is where you loop through your SOTU addresses
      for (let key in positions) {
        const imageSprite = new PIXI.Sprite(resources["Lincoln"].texture);
        // const cluster_pos = positions[key].Cluster_Pos;

        // imageSprite.x = app.renderer.width * (cluster_pos[0] * 2 - 1);
        // imageSprite.y = app.renderer.width * (cluster_pos[1] * 2 - 1);

        imageSprite.x = app.renderer.width * 0.4;
        imageSprite.y = app.renderer.height * 0.4;

        imageSprite.anchor.x = 0.5;
        imageSprite.anchor.y = 0.5;

        imageSprite.interactive = true;
        // console.log("img sprite xy:", imageSprite.x, imageSprite.y);

        const name = key;
        imageSprite.on("click", () => {
          setOverlay(positionDict[name]);
        });

        imageSprite.on("mouseover", () => {
          imageSprite.height = imageSprite.height * 2;
          imageSprite.width = imageSprite.width * 2;
        });

        imageSprite.on("mouseout", () => {
          imageSprite.height = imageSprite.height * 0.5;
          imageSprite.width = imageSprite.width * 0.5;
        });

        viewport.addChild(imageSprite);
      }
    });
  });
  // .catch(err => {
  //   console.log(err);
  // });
  // }, []);

  return (
    <div className="App">
      <canvas ref={canvas}></canvas>
      {overlay && <Overlay details={overlay} setOverlay={setOverlay} />}
    </div>
  );
}

export default App;
