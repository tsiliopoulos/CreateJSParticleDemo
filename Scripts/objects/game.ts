module objects {
    export class Game {
        public static assetManager: managers.AssetManager = new managers.AssetManager();
        public static stage: createjs.Stage;
        public static gameCanvas: HTMLElement;
        public static debugCanvas: HTMLElement;
    }
}
