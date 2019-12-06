import React, { useState, useRef, useEffect } from "react";
import Overlay from "./components/Overlay";
import "./App.css";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

let positions;

function App() {
  const canvas = useRef(null);
  const [overlay, setOverlay] = useState(null);

  // load custer pos onto canvas
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Nedelstein/designing-ml-final/master/sotu_umap_position.json"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        positions = data;
        console.log(positions);
        const app = new PIXI.Application({
          width: window.innderWidth,
          height: window.innerHeight,
          view: canvas.current
        });
        document.body.appendChild(app.view);

        let positionDict = {};
        for (let i = 0; i < positions.length; i++) {
          const presName = positions[i].President;
          const lincoln =
            "https://psmag.com/.image/t_share/MTI3NTgxNjM1NzcxMTU2NDkw/lincoln-portrait.jpg";
          const date = positions[i].Date;
          app.loader.add(presName, lincoln);

          positionDict[presName] = positions[i];
        }
        const viewport = new Viewport({
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          worldWidth: positions.lengt,
          worldHeight: positions.length,
          interaction: app.renderer.plugins.interaction
        });
        app.renderer.backgroundColor = 0xff00ff;

        // add viewport to stage
        app.stage.addChild(viewport);

        // interaction plugins
        viewport
          .drag()
          .pinch()
          .wheel()
          .decelerate();

        app.loader.load((loader, resources) => {
          for (let key in resources) {
            const imageSprite = new PIXI.Sprite(resources[key].texture);
            const cluster_pos = positionDict[key].cluster_pos;

            imageSprite.x = app.renderer.width * (cluster_pos[0] * 2 - 1);
            imageSprite.y = app.renderer.width * (cluster_pos[1] * 2 - 1);

            imageSprite.anchor.x = 0.5;
            imageSprite.anchor.y = 0.5;

            imageSprite.interactive = true;

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
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <canvas ref={canvas}></canvas>
      {overlay && <Overlay details={overlay} setOverlay={setOverlay} />}
    </div>
  );
}

export default App;
