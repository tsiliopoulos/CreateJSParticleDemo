module objects {
    export class Slider extends createjs.Shape {
        // PRIVATE INSTANCE VARIABLES
        private _value: number;
        private _graphics: createjs.Graphics;
        private _min: number;
        private _max: number;
        private _width: number;
        private _height: number;
        private _trackColor: objects.Color;
        private _thumbColor: objects.Color;
        private _orientation: string;

        // PUBLIC PROPERTIES ++++++++++++++++++++++++++

        /**
         * Returns current value of the Slider object
         *
         * @type {number}
         * @memberof Slider
         */
        get value(): number {
            return this._value;
        }

        /**
         * Sets the current value of the Slider object
         *
         * @memberof Slider
         */
        set value(newValue: number) {
            if (this._value != newValue) {
                this._value = newValue;
            }
        }

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++

       /**
        * Creates an instance of a Slider.
        * @param {number} [value=50]
        * @param {number} [min=1]
        * @param {number} [max=100]
        * @param {number} [width=100]
        * @param {number} [height=20]
        * @param {string} [orientation="horizontal"]
        * @param {string} [trackColor=config.Color.WHITE_SMOKE]
        * @param {string} [thumbColor=config.Color.DARK_GREY]
        * @param {number} [x=0]
        * @param {number} [y=0]
        * @param {boolean} [isCentered=false]
        * @memberof Slider
        */
       constructor(value: number = 50, min: number = 1, max: number = 100, width: number = 100, height: number = 20, orientation: string = "horizontal", trackColor: string = config.Color.WHITE_SMOKE, thumbColor: string = config.Color.DARK_GREY, x: number = 0, y: number = 0, isCentered: boolean = false) {
            super();

            // initialize properties
            this._graphics = new createjs.Graphics();
            this._min = min;
            this._max = max;
            this._width = width;
            this._height = height;
            this.value = value;
            this._trackColor = new objects.Color(trackColor);
            this._thumbColor = new objects.Color(thumbColor);
            this.cursor = "pointer";
            this._orientation = orientation

            this.on("mousedown", this._sliderChange, this);
            this.on("pressmove", this._sliderChange, this);

            this._buildSlider();

            this.x = x;
            this.y = y;

            if (isCentered) {
                this.regX = this._width * 0.5;
                this.regY = this._height * 0.5;
            }
        }

        // PRIVATE METHODS

        /**
         * this method calls the build method for either horizontal or vertical orientation cases
         *
         * @private
         * @memberof Slider
         */
        private _buildSlider() {
            let position: number;
            switch (this._orientation) {
                case "horizonal":
                    this._buildHorizontalSlider();
                    break;
                case "vertical":
                    this._buildVerticalSlider();
                    break;
                default:
                    this._buildHorizontalSlider();
                    break;
            }
        }

        /**
         * This method builds a horizontal slider graphic
         *
         * @private
         * @memberof Slider
         */
        private _buildHorizontalSlider(): void {
            let position = (this._width - (this._height * 0.5)) * Math.max(0, Math.min(1, (this.value - this._min) / (this._max - this._min)));
            this._graphics.clear()
                .beginFill(this._trackColor.hex).drawRect(0, 0, this._width, this._height)
                .beginFill(this._thumbColor.hex).drawRect(position, 0, this._height * 0.5, this._height);
            this.graphics = this._graphics;
        }

        /**
         * This method builds a vertical slider graphic
         *
         * @private
         * @memberof Slider
         */
        private _buildVerticalSlider(): void {
            let position = (this._height - (this._width * 0.5)) * Math.max(0, Math.min(1, (this.value - this._min) / (this._max - this._min)));
            this._graphics.clear()
                .beginFill(this._trackColor.hex).drawRect(0, 0, this._width, this._height)
                .beginFill(this._thumbColor.hex).drawRect(0, this._height - (this._width * 0.5) - position, this._width, this._width * 0.5);
            this.graphics = this._graphics;
        }

        /**
         * This event handler changes the value of the slider object according to the mouse position
         *
         * @private
         * @param {createjs.MouseEvent} event
         * @returns
         * @memberof Slider
         */
        private _sliderChange(event: createjs.MouseEvent) {
            let val: number;

            if (this._orientation == "vertical") {
                val = ((this._height - this._width * 0.5) - event.localY) / (this._height - this._width) * (this._max - this._min) + this._min;
            }
            else {
                val = (event.localX - this._height * 0.5) / (this._width - this._height) * (this._max - this._min) + this._min;
            }

            val = Math.max(this._min, Math.min(this._max, val));
            if (val == this.value) {
                return;
            }
            this.value = val;
            this._buildSlider();
            this.dispatchEvent("change");
        }

        // PUBLIC METHODS

        /**
         * Sets the position of the slider
         *
         * @param {number} x
         * @param {number} y
         * @memberof Slider
         */
        public setPosition(x: number, y: number): void {
            this.x = x;
            this.y = y;
        }

        /**
         * Returns the position of the slider object as a vec2
         *
         * @returns {glm.vec2}
         * @memberof Slider
         */
        public getPosition(): glm.vec2 {
            return new glm.vec2(this.x, this.y);
        }
    }
}
