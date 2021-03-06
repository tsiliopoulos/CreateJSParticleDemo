module managers {
  export interface AssetItem {
    id: string;
    src: string;
  }

  let assetManifest = [
    {id: "backButton", src: "./Assets/images/backButton.png"},
    {id: "nextButton", src: "./Assets/images/nextButton.png"},
    {id: "restartButton", src: "./Assets/images/restartButton.png"},
    {id: "startButton", src: "./Assets/images/startButton.png"},
    {id: "explosionParticle", src: "./Assets/images/explosionParticle.png"},
    {id: "flameParticle", src: "./Assets/images/flameParticle.png"},
    {id: "plane", src: "./Assets/images/plane.png"},
  ]

  export class AssetManager extends createjs.LoadQueue {
    public manifest: AssetItem[] = new Array<AssetItem>();
    constructor() {
      super();
      this.manifest = assetManifest;
      this.installPlugin(createjs.Sound);
      this.loadManifest(this.manifest);
    }

    public addItem(id:string, src:string):void {
      this.manifest.push({id, src});
      this.loadManifest(this.manifest);
    }
  }
}
