import { AssetsId } from "./scripts/constants/AssetsId.js";
import { AssetsManager } from "./scripts/managers/AssetsManager.js";
import { Grid as Grid1 } from "./scripts/components/variation1/Grid.js";
import { Grid as Grid2 } from "./scripts/components/variation2/Grid.js";
import { MainThree } from "./scripts/MainThree.js";
import { Ticker } from "./scripts/utils/Ticker.js";

export class Main {
  static async Init() {
    MainThree.Init();
    Ticker.Start();

    await this.#_LoadAssets();
    this.#_CreateScene();
  }

  static async #_LoadAssets() {
    AssetsManager.AddTexture(AssetsId.TEXTURE_1, "./images/img1.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_2, "./images/img2.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_3, "./images/img3.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_4, "./images/img4.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_5, "./images/img5.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_6, "./images/img6.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_7, "./images/img7.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_8, "./images/img8.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_9, "./images/img9.webp");
    AssetsManager.AddTexture(AssetsId.TEXTURE_10, "./images/img10.webp");

    await AssetsManager.Load();

    document.body.classList.remove('loading')
  }

  static #_CreateScene() {
    const var2 = window.location.href.includes('index2');
    const Grid = var2 ? Grid2 : Grid1

    MainThree.Add(new Grid());
  }
}

Main.Init();