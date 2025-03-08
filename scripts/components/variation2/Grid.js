import { Card } from './Card.js';
import { ExtendedObject3D } from "../../utils/ExtendedObject3D.js";
import { MainThree } from '../../MainThree.js';
import { Ticker } from '../../utils/Ticker.js';
import { Vector2 } from 'three';
import { debounce } from '../../utils/debounce.js'

export class Grid extends ExtendedObject3D {
  // static COLUMNS = Math.floor(MainThree.CanvasContainer.offsetWidth / this.rowOffset) | 1;
  // static ROWS = Math.floor(MainThree.CanvasContainer.offsetHeight / this.rowOffset) | 1;

  rowOffset = 75
  static MousePosition = new Vector2();
  #_targetMousePosition = new Vector2();

  constructor() {
    super();

    Grid.COLUMNS = Math.floor(MainThree.CanvasContainer.offsetWidth / this.rowOffset) | 1;
    Grid.ROWS = Math.floor(MainThree.CanvasContainer.offsetHeight / this.rowOffset) | 1;

    Card.SetScale();
    this.#_createCards();
    this.#_setListeners();

    Ticker.Add(this.update);
  }

  #_setListeners() {
    MainThree.CanvasContainer.addEventListener("mousemove", this.#_updateMousePos);
    MainThree.CanvasContainer.addEventListener(
      "touchmove",
      this.#_updateMousePos
    );
  }

  #_createCards() {
    for (let i = 0; i < Grid.COLUMNS; i++) {
      for (let j = 0; j < Grid.ROWS; j++) {
        const card = new Card(i, j);
        this.add(card);
      }
    }
  }

  #_updateMousePos = (event) => {
    const isMobile = event.type === "touchmove";

    const { offsetX, offsetY } = isMobile ? event.changedTouches[0] : event;

    const halfW = 0.5 * MainThree.CanvasContainer.offsetWidth;
    const halfH = 0.5 * MainThree.CanvasContainer.offsetHeight;

    // our position, normalized on a [-1, 1] range.
    const x = ((offsetX - halfW) / MainThree.CanvasContainer.offsetWidth) * 2;
    const y = (-(offsetY - halfH) / MainThree.CanvasContainer.offsetHeight) * 2;

    this.#_targetMousePosition.set(x, y);
  };

  #_handleResize = () => {
    for (const card of this.children) {
      this.remove(card);
      card.dispose();
    }

    this.children = [];

    Grid.COLUMNS = Math.floor(MainThree.CanvasContainer.offsetWidth / this.rowOffset) | 1;
    Grid.ROWS = Math.floor(MainThree.CanvasContainer.offsetHeight / this.rowOffset) | 1;
    Card.SetScale();

    this.#_createCards();
  };

  resize = debounce(this.#_handleResize, 50);

  update = (dt) => {
    this.#_lerpMousePosition(dt);

    for (const card of this.children) {
      card.update(dt);
    }
  };

  #_lerpMousePosition(dt) {
    Grid.MousePosition.lerp(
      this.#_targetMousePosition,
      1 - Math.pow(0.0125, dt)
    );
  }
}