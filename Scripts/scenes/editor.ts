module scenes {
    export class Editor extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _startLabel: objects.Label;
        private _nextButton: objects.Button;
        private _particleEmitter: objects.ParticleEmitter;

        private _numberOfParticlesSlider: objects.Slider;
        private _numberOfParticlesSliderLabel: objects.Label;

        private _particleTypeSlider: objects.Slider;
        private _particleTypeSliderLabel: objects.Label;

        private _circleRadiusSlider: objects.Slider;
        private _circleRadiusSliderLabel: objects.Label;

        private _emitterShapeSlider: objects.Slider;
        private _emitterShapeSliderLabel: objects.Label;

        private _rectangleWidthSlider: objects.Slider;
        private _rectangleWidthSliderLabel: objects.Label;

        private _rectangleHeightSlider: objects.Slider;
        private _rectangleHeightSliderLabel: objects.Label;



        //CONSTRUCTORS
        constructor(currentScene: number) {
            super();

            this._currentScene = currentScene;

            // register button event handlers
            this._nextButtonClick = this._nextButtonClick.bind(this);

            this.Start();
        }

        // PRIVATE METHODS
        private _nextButtonClick(event: createjs.MouseEvent): void {
            this._particleEmitter.playing = !this._particleEmitter.playing;

            //this._currentScene = config.Scene.PLAY;
            //this.removeAllChildren();
        }

        private _numberOfParticlesSliderChanged(event: createjs.Event):void {
            this._particleEmitter.setNumberOfParticles(this._numberOfParticlesSlider.value);
            this._numberOfParticlesSliderLabel.text = "Number: " + this._numberOfParticlesSlider.value.toFixed(0);
        }

        private _particleTypeSliderChanged(event: createjs.Event): void {
            switch(this._particleTypeSlider.value) {
                case config.Particle.CIRCLE:
                    this._particleTypeSliderLabel.text = "Particle: Circle";
                    this._particleEmitter.setParticleType("circle");
                break;
                case config.Particle.SQUARE:
                    this._particleTypeSliderLabel.text = "Particle: Square";
                    this._particleEmitter.setParticleType("square");
                break;
                case config.Particle.TRIANGLE:
                    this._particleTypeSliderLabel.text = "Particle: Triangle";
                    this._particleEmitter.setParticleType("triangle");
                break;
                case config.Particle.HEXAGON:
                    this._particleTypeSliderLabel.text = "Particle: Hexagon";
                    this._particleEmitter.setParticleType("hexagon");
                break;
                case config.Particle.STAR:
                    this._particleTypeSliderLabel.text = "Particle: Star";
                    this._particleEmitter.setParticleType("star");
                break;
                /*
                default:
                    this._particleTypeSliderLabel.text = "Particle: Circle";
                    this._particleEmitter.setParticleType("circle");
                break;
                */
            }
        }

        private _radiusSliderChanged(event: createjs.Event): void {
            this._circleRadiusSliderLabel.text = "Radius: " +  this._circleRadiusSlider.value.toFixed(0);
            this._particleEmitter.setCircleRadius(this._circleRadiusSlider.value);
        }

        private _rectangleWidthSliderChanged(event: createjs.Event): void {
            this._rectangleWidthSliderLabel.text = "Width: " + this._rectangleWidthSlider.value.toFixed(0);
            this._particleEmitter.setRectangleWidth(this._rectangleWidthSlider.value);
        }

        private _rectangleHeightSliderChanged(event: createjs.Event): void {
            this._rectangleHeightSliderLabel.text = "Height: " + this._rectangleHeightSlider.value.toFixed(0);
            this._particleEmitter.setRectangleHeight(this._rectangleHeightSlider.value);
        }

        private _emitterShapeSliderChanged(event: createjs.Event): void {
            let emitterType:string
            switch(this._emitterShapeSlider.value) {
                case config.Emitter.CIRCLE:
                    emitterType = "Circle";
                    this._particleEmitter.setEmitterShape(config.Emitter.CIRCLE);
                break;
                case config.Emitter.RECTANGLE:
                    emitterType = "Recatangle";
                    this._particleEmitter.setEmitterShape(config.Emitter.RECTANGLE);
                break;
                case config.Emitter.ARC:
                    emitterType = "Arc";
                    this._particleEmitter.setEmitterShape(config.Emitter.RECTANGLE);
                break;
                default:
                    emitterType = "Circle";
                    this._particleEmitter.setEmitterShape(config.Emitter.CIRCLE);
                break;
            }
            this._emitterShapeSliderLabel.text = "Shape : " + emitterType;
        }

        // PUBLIC METHODS
        public Start(): void {
            console.log("Particle System Editor");
            let labelColor = objects.Color.Black();

            this._startLabel = new objects.Label("Particle System Editor", "50px", "Consolas", labelColor.hex, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._nextButton = new objects.Button("nextButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);

            this._particleEmitter = new objects.ParticleEmitter();
            this._particleEmitter.setNumberOfParticles(1);
            this._particleEmitter.setParticleType("hexagon");
            this._particleEmitter.setPosition(new glm.vec2(320, 300));

            this._numberOfParticlesSlider  = new objects.Slider(200, 1, 1000, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 40, false);
            this._numberOfParticlesSliderLabel = new objects.Label("Number:", "20px", "Consolas", config.Color.BLACK, 200, 40, false);

            this._particleTypeSlider  = new objects.Slider(0, 0, 4, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 70, false);
            this._particleTypeSliderLabel = new objects.Label("Particle: Square", "20px", "Consolas", config.Color.BLACK, 200, 70, false);

            this._circleRadiusSlider = new objects.Slider(20, 1, 500, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 100, false);
            this._circleRadiusSliderLabel = new objects.Label("Radius: " + this._particleEmitter.circleRadius, "20px", "Consolas", config.Color.BLACK, 200, 100, false);

            this._emitterShapeSlider = new objects.Slider(0, 0, 2, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 130, false);
            this._emitterShapeSliderLabel = new objects.Label("Shape : Rectangle", "20px", "Consolas", config.Color.BLACK, 200, 130, false);

            this._rectangleWidthSlider = new objects.Slider(10, 1, 100, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 160, false);
            this._rectangleWidthSliderLabel = new objects.Label("Width : " + this._particleEmitter.rectangleSize.x, "20px", "Consolas", config.Color.BLACK, 200, 160, false);

            this._rectangleHeightSlider = new objects.Slider(10, 1, 100, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 190, false);
            this._rectangleHeightSliderLabel = new objects.Label("Height : " + this._particleEmitter.rectangleSize.y, "20px", "Consolas", config.Color.BLACK, 200, 190, false);

            this.Main();
        }

        public Update(): number {
            this._particleEmitter.Update();



            return this._currentScene;
        }

        public Main(): void {
            this.addChild(this._startLabel);
            this.addChild(this._nextButton);

            // particle emitter options
            this.addChild(this._numberOfParticlesSlider);
            this.addChild(this._numberOfParticlesSliderLabel);

            this.addChild(this._particleTypeSlider);
            this.addChild(this._particleTypeSliderLabel);

            this.addChild(this._circleRadiusSlider);
            this.addChild(this._circleRadiusSliderLabel);

            this.addChild(this._emitterShapeSlider);
            this.addChild(this._emitterShapeSliderLabel);

            this.addChild(this._rectangleWidthSlider);
            this.addChild(this._rectangleWidthSliderLabel);

            this.addChild(this._rectangleHeightSlider);
            this.addChild(this._rectangleHeightSliderLabel);

            this.addChild(this._particleEmitter);


            this._nextButton.on("click", this._nextButtonClick);

            this._numberOfParticlesSlider.on("change", this._numberOfParticlesSliderChanged, this);
            this._particleTypeSlider.on("change", this._particleTypeSliderChanged, this);
            this._circleRadiusSlider.on("change", this._radiusSliderChanged, this);
            this._emitterShapeSlider.on("change", this._emitterShapeSliderChanged, this);
            this._rectangleWidthSlider.on("change", this._rectangleWidthSliderChanged, this);
            this._rectangleHeightSlider.on("change", this._rectangleHeightSliderChanged, this);
        }
    }
}
