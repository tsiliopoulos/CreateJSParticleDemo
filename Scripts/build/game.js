var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var config;
(function (config) {
    // Color Presets
    var Color = /** @class */ (function () {
        function Color() {
        }
        Color.AZURE = "#F0FFFF";
        Color.BLACK = "#000000";
        Color.BLUE = "#0000FF";
        Color.BROWN = "#A52A2A";
        Color.CRIMSON = "#DC143C";
        Color.CYAN = "#00FFFF";
        Color.DARK_BLUE = "#00008B";
        Color.DARK_GREY = "#A9A9A9";
        Color.DARK_ORANGE = "#FF8C00";
        Color.DARK_RED = "#8B0000";
        Color.GOLD = "#FFD700";
        Color.GREEN = "#00FF00";
        Color.GREY = "#808080";
        Color.HOT_PINK = "#FF69B4";
        Color.INDIGO = "#4B0082";
        Color.IVORY = "#FFFFF0";
        Color.LIGHT_BLUE = "#ADD8E6";
        Color.LIGHT_GREY = "#D3D3D3";
        Color.LIGHT_PINK = "#FFB6C1";
        Color.LIGHT_YELLOW = "#FFFFE0";
        Color.MAGENTA = "#FF00FF";
        Color.MAROON = "#800000";
        Color.NAVY = "#000080";
        Color.OLIVE = "#808000";
        Color.ORANGE = "#FFA500";
        Color.PEACH = "#FFDAB9";
        Color.PINK = "#FFC0CB";
        Color.PURPLE = "#800080";
        Color.RED = "#FF0000";
        Color.SILVER = "#C0C0C0";
        Color.TEAL = "#008080";
        Color.VIOLET = "#EE82EE";
        Color.WHITE = "#FFFFFF";
        Color.WHITE_SMOKE = "#F5F5F5";
        Color.YELLOW = "#FFFF00";
        return Color;
    }());
    config.Color = Color;
})(config || (config = {}));
var config;
(function (config) {
    var Emitter;
    (function (Emitter) {
        Emitter[Emitter["RECTANGLE"] = 0] = "RECTANGLE";
        Emitter[Emitter["CIRCLE"] = 1] = "CIRCLE";
        Emitter[Emitter["ARC"] = 2] = "ARC";
    })(Emitter = config.Emitter || (config.Emitter = {}));
})(config || (config = {}));
var config;
(function (config) {
    var Gamepad;
    (function (Gamepad) {
        Gamepad[Gamepad["HORIZONTAL"] = 0] = "HORIZONTAL";
        Gamepad[Gamepad["VERTICAL"] = 1] = "VERTICAL";
        Gamepad[Gamepad["ROTATION"] = 2] = "ROTATION";
    })(Gamepad = config.Gamepad || (config.Gamepad = {}));
})(config || (config = {}));
var config;
(function (config) {
    var Key = /** @class */ (function () {
        function Key() {
        }
        // Keyboard values
        Key.A = 65;
        Key.CTRL = 17;
        Key.D = 68;
        Key.DOWN_ARROW = 40;
        Key.ESCAPE = 27;
        Key.LEFT_ARROW = 37;
        Key.RIGHT_ARROW = 39;
        Key.S = 83;
        Key.SHIFT = 16;
        Key.SPACEBAR = 32;
        Key.UP_ARROW = 38;
        Key.W = 87;
        return Key;
    }());
    config.Key = Key;
})(config || (config = {}));
var config;
(function (config) {
    var Particle;
    (function (Particle) {
        Particle[Particle["CIRCLE"] = 0] = "CIRCLE";
        Particle[Particle["SQUARE"] = 1] = "SQUARE";
        Particle[Particle["TRIANGLE"] = 2] = "TRIANGLE";
        Particle[Particle["HEXAGON"] = 3] = "HEXAGON";
        Particle[Particle["STAR"] = 4] = "STAR";
    })(Particle = config.Particle || (config.Particle = {}));
})(config || (config = {}));
var config;
(function (config) {
    var ParticleEmitter;
    (function (ParticleEmitter) {
        ParticleEmitter[ParticleEmitter["SPHERE"] = 0] = "SPHERE";
        ParticleEmitter[ParticleEmitter["CUBOID"] = 1] = "CUBOID";
        ParticleEmitter[ParticleEmitter["FRUSTUM"] = 2] = "FRUSTUM";
    })(ParticleEmitter = config.ParticleEmitter || (config.ParticleEmitter = {}));
})(config || (config = {}));
var config;
(function (config) {
    // Scene Presets
    var Scene = /** @class */ (function () {
        function Scene() {
        }
        Scene.START = 0;
        Scene.EDITOR = 1;
        Scene.PLAY = 2;
        Scene.END = 3;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));
var config;
(function (config) {
    // Screen Size Configuration
    var Screen = /** @class */ (function () {
        function Screen() {
        }
        Screen.WIDTH = 640;
        Screen.HEIGHT = 480;
        Screen.HALF_WIDTH = Screen.WIDTH * 0.5;
        Screen.HALF_HEIGHT = Screen.HEIGHT * 0.5;
        return Screen;
    }());
    config.Screen = Screen;
})(config || (config = {}));
//IIFE to encapsulate game
(function () {
    // game variables
    var assetManager;
    var currentScene;
    var currentState;
    var debugCanvas;
    var gameCanvas;
    var height = config.Screen.HEIGHT;
    var stage;
    var width = config.Screen.WIDTH;
    var stats;
    function SetupStats() {
        stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
    }
    // Initializes game variables
    function Init() {
        console.log("Initialization");
        SetupStats();
        gameCanvas = document.getElementById("game");
        debugCanvas = document.getElementById("debug");
        gameCanvas.setAttribute("width", width.toString());
        gameCanvas.setAttribute("height", height.toString());
        debugCanvas.setAttribute("width", width.toString());
        debugCanvas.setAttribute("height", height.toString());
        // set global game object variables
        objects.Game.assetManager.on("complete", Start);
        objects.Game.gameCanvas = gameCanvas;
        objects.Game.debugCanvas = debugCanvas;
    }
    // Starts game
    function Start() {
        console.log("Start");
        stage = new createjs.Stage(gameCanvas);
        objects.Game.stage = stage; // save the stage to the global game object
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        currentState = config.Scene.START;
        Main();
    }
    // Main Game Loop
    function Update() {
        stats.begin();
        var newState = currentScene.Update();
        if (newState != currentState) {
            currentState = newState;
            Main();
        }
        stats.end();
        stage.update();
    }
    function Main() {
        console.log("Main FSM");
        stage.removeAllChildren();
        switch (currentState) {
            case config.Scene.START:
                currentScene = new scenes.Start(currentState);
                break;
            case config.Scene.EDITOR:
                currentScene = new scenes.Editor(currentState);
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.Play(currentState);
                break;
            case config.Scene.END:
                currentScene = new scenes.End(currentState);
                break;
        }
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
var glm;
(function (glm) {
    var Point = /** @class */ (function () {
        function Point(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        return Point;
    }());
    glm.Point = Point;
})(glm || (glm = {}));
var objects;
(function (objects) {
    var Color = /** @class */ (function () {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Color.
         *
         * @param {(number | number[] | string)} [r=0] red color value or number array or hex string
         * @param {number} [g=0] green color value
         * @param {number} [b=0] blue color value
         * @param {number} [a=0] alpha color value
         * @memberof Color
         */
        function Color(r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 0; }
            // PUBLIC INSTANCE VARIABLES
            this._r = 0;
            this._g = 0;
            this._b = 0;
            this._a = 0;
            if (typeof r === "number") {
                this._setRGBA(r, g, b, a);
            }
            else if (typeof r === "string") {
                this._setHexColor(r);
            }
            else {
                this._arrayToColor(r);
            }
        }
        Object.defineProperty(Color.prototype, "r", {
            // PUBLIC PROPERTIES
            /**
             * This property returns the Red value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            get: function () {
                return this._r;
            },
            /**
            * This property sets the Red value of the Color object
            *
            * @type {number}
            * @memberof Color
            */
            set: function (red) {
                red = this._clampColor0To255(red);
                this._r = red;
                this._hex = this._toHexString();
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            /**
            * This property returns the Green value of the Color object
            *
            * @type {number}
            * @memberof Color
            */
            get: function () {
                return this._g;
            },
            /**
             * This property sets the Green value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            set: function (green) {
                green = this._clampColor0To255(green);
                this._g = green;
                this._hex = this._toHexString();
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            /**
             * This property returns the Blue value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            get: function () {
                return this._b;
            },
            /**
            * This property sets the Blue value of the Color object
            *
            * @type {number}
            * @memberof Color
            */
            set: function (blue) {
                blue = this._clampColor0To255(blue);
                this._b = blue;
                this._hex = this._toHexString();
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "a", {
            /**
             * This property returns the Alpha value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            get: function () {
                return this._a;
            },
            /**
             * This property sets the Alpha value of the Color object
             *
             * @type {number}
             * @memberof Color
             */
            set: function (alpha) {
                alpha = this._clampColor0To255(alpha);
                this._a = alpha;
                this._fullHex = this._toFullHexString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "hex", {
            /**
             * This property returns a hex reprentation of the Color object
             * Does not include the alpha value
             *
             * @type {string}
             * @memberof Color
             */
            get: function () {
                return this._hex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "fullHex", {
            /**
             * This property returns a hex representation of the Color object
             *
             * @type {string}
             * @memberof Color
             */
            get: function () {
                return this._fullHex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "rgb", {
            /**
             * This property returns a number array composed of the r, g, and b components of the Color object.
             * Values range from 0 to 255.
             *
             * @type {number[]}
             * @memberof Color
             */
            get: function () {
                return [this.r, this.g, this.b];
            },
            /**
             * This property sets the r, g, b values of the color object.
             * Acceptable values are 0 to 255
             *
             * @type {number[]}
             * @memberof Color
             */
            set: function (color) {
                this._arrayToColor(color);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "normalize", {
            /**
             * This property returns a number array composed of the components of the Color object
             * Values range from 0 to 1
             *
             * @readonly
             * @type {number[]}
             * @memberof Color
             */
            get: function () {
                return [this.r / 255.00, this.g / 255.00, this.b / 255.00, this.a / 255.00];
            },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method returns a string representation of the color object
         *
         * @returns {string}
         * @memberof Color
         */
        Color.prototype.toString = function () {
            return "(R: " + this.r + " G: " + this.g + " B: " + this.b + " A: " + this.a + ")";
        };
        /**
         * Covert decimal value to hex value
         *
         * @param {number} [decimal=0]
         * @returns {string}
         * @memberof Color
         */
        Color.prototype.decimalToHex = function (decimal) {
            if (decimal === void 0) { decimal = 0; }
            var hex = Number(decimal).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        };
        // PUBLIC STATIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method returns a number array of normalized values (between 0 and 1)
         *
         * @static
         * @param {Color} color
         * @returns {number[]}
         * @memberof Color
         */
        Color.normalize = function (color) {
            return [color.r / 255.00, color.g / 255.00, color.b / 255.00, color.a / 255.00];
        };
        /**
         * This method the Hex Color representation of an R, G, B color object
         *
         * @static
         * @param {Color} color
         * @returns {string}
         * @memberof Color
         */
        Color.RGBToHex = function (color) {
            return "#" + color.decimalToHex(color.r) + color.decimalToHex(color.g) + color.decimalToHex(color.b);
        };
        /**
         * Converts a hex color string to a number array of r, g and b color components
         * Array values are between 0 and 255
         *
         * @static
         * @param {string} color
         * @returns {number[]}
         * @memberof Color
         */
        Color.HexToRGB = function (color) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        };
        Color.HexToColor = function (color) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255);
        };
        Color.RandomRange = function (colorA, colorB) {
            var Red = Math.floor(glm.RandomRange(colorA.r, colorB.r));
            var Green = Math.floor(glm.RandomRange(colorA.g, colorB.g));
            var Blue = Math.floor(glm.RandomRange(colorA.b, colorB.b));
            var Alpha = Math.floor(glm.RandomRange(colorA.a, colorB.a));
            return new objects.Color(Red, Green, Blue, Alpha);
        };
        // PUBLIC COLOR PRESETS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Color.Azure = function () {
            return new Color(config.Color.AZURE);
        };
        Color.Black = function () {
            return new Color(0, 0, 0, 255);
        };
        Color.Blue = function () {
            return new Color(0, 0, 255, 255);
        };
        Color.Brown = function () {
            return new Color(config.Color.BROWN);
        };
        Color.Crimson = function () {
            return new Color(config.Color.CRIMSON);
        };
        Color.Cyan = function () {
            return new Color(config.Color.CYAN);
        };
        Color.DarkBlue = function () {
            return new Color(config.Color.DARK_BLUE);
        };
        Color.DarkGrey = function () {
            return new Color(config.Color.DARK_GREY);
        };
        Color.DarkOrange = function () {
            return new Color(config.Color.DARK_ORANGE);
        };
        Color.DarkRed = function () {
            return new Color(config.Color.DARK_RED);
        };
        Color.Gold = function () {
            return new Color(config.Color.GOLD);
        };
        Color.Green = function () {
            return new Color(0, 255, 0, 255);
        };
        Color.Grey = function () {
            return new Color(config.Color.GREY);
        };
        Color.HotPink = function () {
            return new Color(config.Color.HOT_PINK);
        };
        Color.Indigo = function () {
            return new Color(config.Color.INDIGO);
        };
        Color.Ivory = function () {
            return new Color(config.Color.IVORY);
        };
        Color.LightBlue = function () {
            return new Color(config.Color.LIGHT_BLUE);
        };
        Color.LightGrey = function () {
            return new Color(config.Color.LIGHT_GREY);
        };
        Color.LightPink = function () {
            return new Color(config.Color.LIGHT_PINK);
        };
        Color.LightYellow = function () {
            return new Color(config.Color.LIGHT_YELLOW);
        };
        Color.Magenta = function () {
            return new Color(config.Color.MAGENTA);
        };
        Color.Maroon = function () {
            return new Color(config.Color.MAROON);
        };
        Color.Navy = function () {
            return new Color(config.Color.NAVY);
        };
        Color.Olive = function () {
            return new Color(config.Color.OLIVE);
        };
        Color.Orange = function () {
            return new Color(config.Color.ORANGE);
        };
        Color.Peach = function () {
            return new Color(config.Color.PEACH);
        };
        Color.Purple = function () {
            return new Color(config.Color.PURPLE);
        };
        Color.Red = function () {
            return new Color(255, 0, 0, 255);
        };
        Color.Silver = function () {
            return new Color(config.Color.SILVER);
        };
        Color.Teal = function () {
            return new Color(config.Color.TEAL);
        };
        Color.Violet = function () {
            return new Color(config.Color.VIOLET);
        };
        Color.White = function () {
            return new Color(255, 255, 255, 255);
        };
        Color.WhiteSmoke = function () {
            return new Color(config.Color.WHITE_SMOKE);
        };
        Color.Yellow = function () {
            return new Color(config.Color.YELLOW);
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Set the color component values
         *
         * @private
         * @param {number} [r]
         * @param {number} [g]
         * @param {number} [b]
         * @param {number} [a]
         * @memberof Color
         */
        Color.prototype._setRGBA = function (r, g, b, a) {
            if (r) {
                this.r = Math.floor(r);
            }
            if (g) {
                this.g = Math.floor(g);
            }
            if (b) {
                this.b = Math.floor(b);
            }
            if (a) {
                this.a = Math.floor(a);
            }
            if (!this.hex) {
                this._hex = this._toHexString();
            }
        };
        /**
         * Parses the hex color parameter to individual color components (r, g, b).
         * Sets alpha channel to 255.
         *
         * @private
         * @param {string} color
         * @memberof Color
         */
        Color.prototype._setHexColor = function (color) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            this.r = parseInt(result[1], 16);
            this.g = parseInt(result[2], 16);
            this.b = parseInt(result[3], 16);
            this.a = 255;
        };
        /**
         * Parses a number array and separates color components (r, g, b, a)
         *
         * @private
         * @param {number[]} color
         * @memberof Color
         */
        Color.prototype._arrayToColor = function (color) {
            var length = color.length;
            if (length > 0) {
                this.r = color[0];
                if (length > 1) {
                    this.g = color[1];
                    if (length > 2) {
                        this.b = color[2];
                        if (length > 3) {
                            this.a = color[3];
                        }
                    }
                }
            }
        };
        /**
         * This method clamps a number value beetween 0 and 255
         *
         * @private
         * @param {number} value
         * @returns {number}
         * @memberof Color
         */
        Color.prototype._clampColor0To255 = function (value) {
            var color = value;
            if (value < 0) {
                color = 0;
            }
            if (value > 255) {
                color = 255;
            }
            return color;
        };
        /**
         * This method converts a Color object's components to hex values and returns a hex string representation
         *
         * @private
         * @returns {string}
         * @memberof Color
         */
        Color.prototype._toFullHexString = function () {
            return "#" + this.decimalToHex(this.r) + this.decimalToHex(this.g) + this.decimalToHex(this.b) + this.decimalToHex(this.a);
        };
        /**
         * This method converts a Color object's components to hex values and returns a hex string representation
         * Does not include the alpha value
         *
         * @private
         * @returns {string}
         * @memberof Color
         */
        Color.prototype._toHexString = function () {
            return "#" + this.decimalToHex(this.r) + this.decimalToHex(this.g) + this.decimalToHex(this.b);
        };
        return Color;
    }());
    objects.Color = Color;
})(objects || (objects = {}));
/// <reference path = "../objects/color.ts"/>
var glm;
/// <reference path = "../objects/color.ts"/>
(function (glm) {
    glm.EPSILON = 0.000001;
    glm.Deg2Rad = Math.PI / 180.0;
    glm.Rad2Deg = 180.0 / Math.PI;
    /**
     * Returns the -1 if the value is less than 0 and 1 if the value is greater than 0
     *
     * @export
     * @param {number} value
     * @returns {number}
     */
    function sign(value) {
        return (value < 0.0) ? -1.0 : 1.0;
    }
    glm.sign = sign;
    /**
     * This method confines the value provided between min and max and returns the result
     *
     * @export
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    function clamp(value, min, max) {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }
    glm.clamp = clamp;
    /**
     * Clamps a value between 0 and 1 and returns the result
     *
     * @export
     * @param {number} value
     * @returns {number}
     */
    function clamp01(value) {
        var result;
        if (value < 0.0) {
            result = 0.0;
        }
        else if (value > 1.0) {
            result = 1.0;
        }
        else {
            result = value;
        }
        return result;
    }
    glm.clamp01 = clamp01;
    function limitMagnitude(vector, magnitude) {
        var length = glm.vec2.magnitude(vector);
        if (length > magnitude) {
            var limiter = magnitude / length;
            vector.x *= limiter;
            vector.y *= limiter;
            return vector;
        }
        else {
            return vector;
        }
    }
    glm.limitMagnitude = limitMagnitude;
    /**
     * Performs Linear Interpolation between and b
     * at some t value betwee 0 and 1
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    function lerp(a, b, t) {
        return a + (b - a) * glm.clamp01(t);
    }
    glm.lerp = lerp;
    /**
     * Lerps between a and b at some t value - unclamped.
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    function lerpUnclamped(a, b, t) {
        return a + (b - a) * t;
    }
    glm.lerpUnclamped = lerpUnclamped;
    /**
     * Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    function lerpAngle(a, b, t) {
        var num = glm.repeat(b - a, 360.0);
        if (num > 180.0) {
            num -= 360.0;
        }
        return a + num * glm.clamp01(t);
    }
    glm.lerpAngle = lerpAngle;
    /**
     * lerps between to color objects at some tValue;
     *
     * @export
     * @param {objects.Color} a
     * @param {objects.Color} b
     * @param {number} t
     * @returns {objects.Color}
     */
    function lerpColor(a, b, t) {
        var red = a.r + (b.r - a.r) * glm.clamp01(t);
        var green = a.g + (b.g - a.g) * glm.clamp01(t);
        var blue = a.b + (b.b - a.b) * glm.clamp01(t);
        var alpha = a.a + (b.a - a.a) * glm.clamp01(t);
        return new objects.Color(red, green, blue, alpha);
    }
    glm.lerpColor = lerpColor;
    /**
     * Moves a value current towards target.
     * This is essentially the same as Lerp but instead the function will ensure that the speed never exceeds maxDelta.
     * Negative values of maxDelta pushes the value away from target.
     *
     * @export
     * @param {number} current  // the current value
     * @param {number} target   // the value to move towards
     * @param {number} maxDelta // the maximum change that should be applie to the value
     * @returns {number}
     */
    function moveTowards(current, target, maxDelta) {
        var result;
        if (Math.abs(target - current) <= maxDelta) {
            result = target;
        }
        else {
            result = current + glm.sign(target - current) * maxDelta;
        }
        return result;
    }
    glm.moveTowards = moveTowards;
    /**
     * Same as MoveTowards but makes sure the values interpolate correctly when they wrap around 360 degrees.
     * Variables current and target are assumed to be in degrees.
     *
     * @export
     * @param {number} current
     * @param {number} target
     * @param {number} maxDelta
     * @returns {number}
     */
    function moveTowardsAngle(current, target, maxDelta) {
        var num = glm.deltaAngle(current, target);
        var result;
        if (-maxDelta < num && num < maxDelta) {
            result = target;
        }
        else {
            target = current + num;
            result = glm.moveTowards(current, target, maxDelta);
        }
        return result;
    }
    glm.moveTowardsAngle = moveTowardsAngle;
    /**
     * Interpolates between min and max with smoothing at the limits.
     *
     * @export
     * @param {number} from
     * @param {number} to
     * @param {number} t
     * @returns {number}
     */
    function smoothStep(from, to, t) {
        t = glm.clamp01(t);
        t = -2.0 * t * t * t + 3.0 * t * t;
        return to * t + from * (1.0 - t);
    }
    glm.smoothStep = smoothStep;
    function gamma(value, absmax, gamma) {
        var flag = false;
        if (value < 0.0) {
            flag = true;
        }
        var num = Math.abs(value);
        var result;
        if (num > absmax) {
            result = ((!flag) ? num : (-num));
        }
        else {
            var num2 = Math.pow(num / absmax, gamma) * absmax;
            result = ((!flag) ? num2 : (-num2));
        }
        return result;
    }
    glm.gamma = gamma;
    /**
     * Compares two floating point values and returns true if they are similar.
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @returns {boolean}
     */
    function approximately(a, b) {
        return Math.abs(b - a) < Math.max(1E-06 * Math.max(Math.abs(a), Math.abs(b)), glm.EPSILON * 8.0);
    }
    glm.approximately = approximately;
    /**
     * Loops the value t, so that it is never larger than length and never smaller than 0.
     *
     * @export
     * @param {number} t
     * @param {number} length
     * @returns {number}
     */
    function repeat(t, length) {
        return glm.clamp(t - Math.floor(t / length) * length, 0.0, length);
    }
    glm.repeat = repeat;
    /**
     * PingPongs the value t, so that it is never larger than length and never smaller than 0.
     *
     * @export
     * @param {number} t
     * @param {number} length
     * @returns {number}
     */
    function pingpong(t, length) {
        t = glm.repeat(t, length * 2.0);
        return length - Math.abs(t - length);
    }
    glm.pingpong = pingpong;
    /**
     * Calculates the linear parameter t that produces the interpolant value within the range [a, b].
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @param {number} value
     * @returns {number}
     */
    function inverseLerp(a, b, value) {
        var result;
        if (a != b) {
            result = glm.clamp01((value - a) / (b - a));
        }
        else {
            result = 0.0;
        }
        return result;
    }
    glm.inverseLerp = inverseLerp;
    /**
     * Calculates the shortest difference between two given angles given in degrees.
     *
     * @export
     * @param {number} current
     * @param {number} target
     * @returns {number}
     */
    function deltaAngle(current, target) {
        var num = glm.repeat(target - current, 360.0);
        if (num > 180.0) {
            num -= 360.0;
        }
        return num;
    }
    glm.deltaAngle = deltaAngle;
    function lineIntersection(p1, p2, p3, p4, result) {
        if (!result) {
            result = new glm.vec2();
        }
        var num = p2.x - p1.x;
        var num2 = p2.y - p1.y;
        var num3 = p4.x - p3.x;
        var num4 = p4.y - p3.y;
        var num5 = num * num4 - num2 * num3;
        var result2;
        if (num5 == 0.0) {
            result2 = false;
        }
        else {
            var num6 = p3.x - p1.x;
            var num7 = p3.y - p1.y;
            var num8 = (num6 * num4 - num7 * num3) / num5;
            result = new glm.vec2(p1.x + num8 * num, p1.y + num8 * num2);
            result2 = true;
        }
        return result2;
    }
    glm.lineIntersection = lineIntersection;
    function RandomRange(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
    glm.RandomRange = RandomRange;
    /**
     * This Utility function checks to see if a number is very small (close to EPSILON)
     * If so, it changes the value to 0.0;
     *
     * @export
     * @param {number} value
     * @returns {number}
     */
    function Sanitize(value) {
        if ((value >= -glm.EPSILON) && (value <= glm.EPSILON)) {
            value = 0.0;
        }
        return value;
    }
    glm.Sanitize = Sanitize;
})(glm || (glm = {}));
var glm;
(function (glm) {
    var Vector = /** @class */ (function (_super) {
        __extends(Vector, _super);
        function Vector(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 0; }
            return _super.call(this, x, y, z, w) || this;
        }
        Object.defineProperty(Vector.prototype, "rgb", {
            get: function () {
                return new Vector(this.x, this.y, this.z);
            },
            set: function (vec) {
                this.x = vec.x;
                this.y = vec.y;
                this.z = vec.z;
                this.w = 1.0;
            },
            enumerable: true,
            configurable: true
        });
        return Vector;
    }(glm.Point));
    glm.Vector = Vector;
})(glm || (glm = {}));
/// <reference path="vector.ts"/>
var glm;
/// <reference path="vector.ts"/>
(function (glm) {
    /**
     * The vec2 class which represents a 2D Vector with x and y properties
     *
     * @export
     * @class vec2
     * @extends {Vector}
     */
    var vec2 = /** @class */ (function (_super) {
        __extends(vec2, _super);
        /**
         * Creates an instance of vec2.
         *
         * @constructor
         * @param {number} [x=0] // defaults value to 0
         * @param {number} [y=0] // defaults value to 0
         * @memberof vec2
         */
        function vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, x, y) || this;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        Object.defineProperty(vec2.prototype, "xy", {
            /***********************************************************************/
            /* GETTERS & SETTERS                                                   */
            /***********************************************************************/
            get: function () {
                return new vec2(this.x, this.y);
            },
            set: function (vec) {
                this.x = vec.x;
                this.y = vec.y;
            },
            enumerable: true,
            configurable: true
        });
        /***********************************************************************/
        /* PUBLIC METHODS                                                      */
        /***********************************************************************/
        /**
         * This method resets the vec2 object to zero values
         *
         * @memberof vec2
         */
        vec2.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
        };
        /**
         * This method adds a vec2 to a vec2
         * Equivalent to += shortcut operation
         *
         * @param {vec2} vec
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.prototype.add = function (vec) {
            this.x += vec.x;
            this.y += vec.y;
            return this;
        };
        /**
         * This method subtracts a vec2 from a vec2
         * Equivalent to -= shortcut operation
         *
         * @param {vec2} vec
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.prototype.subtract = function (vec) {
            this.x -= vec.x;
            this.y -= vec.y;
            return this;
        };
        /**
         * This method multiplies a vec2 by another vec2
         * Equivalent to *= shortcut operation
         *
         * @param {vec2} vec
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.prototype.multiply = function (vec) {
            this.x *= vec.x;
            this.y *= vec.y;
            return this;
        };
        /**
         * This method divides a vec2 by another vec2
         * Equivalent to /= shortcut operation
         *
         * @param {vec2} vec
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.prototype.divide = function (vec) {
            this.x /= vec.x;
            this.y /= vec.y;
            return this;
        };
        /**
         * The method scales this vec2 by the scalar {value} parameter.
         *
         * @param {number} value
         * @memberof vec2
         */
        vec2.prototype.scale = function (value) {
            this.x *= value;
            this.y *= value;
        };
        /**
         * Sets the x and y components of this vec2
         *
         * @param {number} x
         * @param {number} y
         * @memberof vec2
         */
        vec2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        /**
         * Returns the magnitude of this vec2
         *
         * @returns {number}
         * @memberof vec2
         */
        vec2.prototype.magnitude = function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        };
        /**
         * Returns the sqrMagnitude of this vec2
         * No Square Root
         * @returns {number}
         * @memberof vec2
         */
        vec2.prototype.sqrMagnitude = function () {
            return (this.x * this.x) + (this.y * this.y);
        };
        /**
         * This method returns the normalized value of this vec2
         *
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.prototype.normalized = function () {
            var result = new vec2(this.x, this.y);
            result.normalize();
            return result;
        };
        /**
         * This method normalizes the vec2 object
         *
         * @memberof vec2
         */
        vec2.prototype.normalize = function () {
            var magnitude = this.magnitude();
            if (magnitude > glm.EPSILON) {
                this.x /= magnitude;
                this.y /= magnitude;
            }
            else {
                this.reset();
            }
        };
        /**
        * This method overrides the built-in toString method to format the values
        * of a vec2 in (x, y) form and outputs this as a string
        *
        * @returns {string}
        * @memberof vec2
        */
        vec2.prototype.toString = function () {
            var x = this.x.toFixed(2);
            var y = this.y.toFixed(2);
            return "(" + x + ", " + y + ")";
        };
        /*****************************************************************/
        /* STATIC METHODS                                                */
        /*****************************************************************/
        /**
         * This method adds vecA and vecB and returns the result in dest
         * or a new vec2 object
         *
         * @static
         * @param {glm.vec2} vecA
         * @param {glm.vec2} vecB
         * @param {glm.vec2} [dest]
         * @returns {glm.vec2}
         * @memberof vec2
         */
        vec2.add = function (vecA, vecB, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = vecA.x + vecB.x;
            dest.y = vecA.y + vecB.y;
            return dest;
        };
        /**
         * This method subtracts vecB from vecA and then returns the result in dest
         * or a new vec2 object
         *
         * @static
         * @param {glm.vec2} vecA
         * @param {glm.vec2} vecB
         * @param {glm.vec2} [dest]
         * @returns {glm.vec2}
         * @memberof vec2
         */
        vec2.subtract = function (vecA, vecB, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = vecB.x - vecA.x;
            dest.y = vecB.y - vecA.y;
            return dest;
        };
        /**
         * This method copys the source vec2 into the destination vec2
         * or returns the result in a new vec2
         *
         * @static
         * @param {vec2} src  // source vec2
         * @param {vec2} [dest] // optional destination vec2
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.copy = function (src, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = src.x;
            dest.y = src.y;
            return dest;
        };
        /**
         * This method rounds the source vec2 up using the Math.ceil function
         * and returns the result in dest or returns the result in a new vec2
         *
         * @static
         * @param {vec2} src  // source vec2
         * @param {vec2} [dest] // optional destination vec2
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.ceil = function (src, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = Math.ceil(src.x);
            dest.y = Math.ceil(src.y);
            return dest;
        };
        /**
         * This method rounds the source vec2 down using the Math.floor function
         * and returns the result in dest or returns the result in a new vec2
         *
         * @static
         * @param {vec2} src  // source vec2
         * @param {vec2} [dest] // optional destination vec2
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.floor = function (src, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = Math.floor(src.x);
            dest.y = Math.floor(src.y);
            return dest;
        };
        /**
     * This method rounds the src vec2 and returns the result in dest
     * or returns the result in a new vec2
     *
     * @static
     * @param {vec2} src // source vec2
     * @param {vec2} [dest] // optional destination vec2
     * @returns {vec2}
     * @memberof vec2
     */
        vec2.round = function (src, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = Math.round(src.x);
            dest.y = Math.round(src.y);
            return dest;
        };
        /**
         * This method computes the minimum values for x and y from vecA and vecB
         * and returns them in dest or returns the result in a new vec2
         *
         * @static
         * @param {vec2} vecA // first vec2
         * @param {vec2} vecB // second vec2
         * @param {vec2} [dest] // optional destination vec2
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.min = function (vecA, vecB, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = Math.min(vecA.x, vecB.x);
            dest.y = Math.min(vecA.y, vecB.y);
            return dest;
        };
        /**
         * This method computes the maximum values of x and y from vecA and vecB
         * and returns the result in dest or returns the result as a new vec2
         *
         * @static
         * @param {vec2} vecA // first vec2
         * @param {vec2} vecB // second vec2
         * @param {vec2} [dest] // optional destination vec2
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.max = function (vecA, vecB, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = Math.max(vecA.x, vecB.x);
            dest.y = Math.max(vecA.y, vecB.y);
            return dest;
        };
        /**
         * Returns the Euclidian distance of vecA and vecB
         *
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @returns {number}
         * @memberof vec2
         */
        vec2.distance = function (vecA, vecB) {
            var x = vecB.x - vecA.x;
            var y = vecB.y - vecA.y;
            return Math.sqrt((x * x) + (y * y));
        };
        /**
         * Returns the Squared Euclidian distance of vecA and vecB
         * No Square Root
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @returns {number}
         * @memberof vec2
         */
        vec2.squaredDistance = function (vecA, vecB) {
            var x = vecB.x - vecA.x;
            var y = vecB.y - vecA.y;
            return (x * x) + (y * y);
        };
        /**
         * Returns the magnitude of a vec2
         *
         * @static
         * @param {vec2} vec
         * @returns {number}
         * @memberof vec2
         */
        vec2.magnitude = function (vec) {
            var x = vec.x;
            var y = vec.y;
            return Math.sqrt((x * x) + (y * y));
        };
        /**
         * Returns the squared Magnitude of a vec2
         * No Square Root
         *
         * @static
         * @param {vec2} vec
         * @returns {number}
         * @memberof vec2
         */
        vec2.squaredMagnitude = function (vec) {
            var x = vec.x;
            var y = vec.y;
            return (x * x) + (y * y);
        };
        /**
         * Negates the x and y components of a src vec2 and returns them in dest vec2
         * or a new vec2 object
         *
         * @static
         * @param {vec2} src    // source vec2
         * @param {vec2} [dest] // optional destinatino vec2
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.negate = function (src, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = -src.x;
            dest.y = -src.y;
            return dest;
        };
        /**
         * Returns the inverse x and y components of src vec2 and returns them in dest vec2
         * or a new vec2 object
         *
         * @static
         * @param {vec2} src
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.inverse = function (src, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = 1.0 / src.x;
            dest.y = 1.0 / src.y;
            return dest;
        };
        /**
         * Normalizes src and stores the result in dest
         * or a new vec2 object
         *
         * @static
         * @param {vec2} src
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.normalize = function (src, dest) {
            if (!dest) {
                dest = new vec2();
            }
            var x = src.x;
            var y = src.y;
            var length = (x * x) + (y * y);
            if (length > 0) {
                length = 1.0 / Math.sqrt(length);
                dest.x = src.x * length;
                dest.y = src.y * length;
            }
            return dest;
        };
        /**
         * Computes the dot product of vecA and vecB and returns a scalar value
         *
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @returns {number}
         * @memberof vec2
         */
        vec2.dot = function (vecA, vecB) {
            return (vecA.x * vecB.x) + (vecA.y * vecB.y);
        };
        /**
         * Computes the cross product of vecA and vecB and returns the result
         * in dest, a vec3 object or a new vec3 object is generated
         *
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @param {vec3} [dest]
         * @returns {vec3}
         * @memberof vec2
         */
        vec2.cross = function (vecA, vecB, dest) {
            if (!dest) {
                dest = new glm.vec3();
            }
            var z = (vecA.x * vecB.y) - (vecA.y * vecB.x);
            dest.x = 0;
            dest.y = 0;
            dest.z = z;
            return dest;
        };
        /**
         * Performs a Linear Interpolation between vecA and vecB using the tValue
         * and returns the result in dest vec2 or a new vec2 object.
         * tValue is clamped between 0 and 1
         *
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @param {number} tValue
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.lerp = function (vecA, vecB, tValue, dest) {
            if (!dest) {
                dest = new vec2();
            }
            tValue = glm.clamp01(tValue);
            dest.x = ((1.0 - tValue) * vecA.x) + (tValue * vecB.x);
            dest.y = ((1.0 - tValue) * vecA.y) + (tValue * vecB.y);
            return dest;
        };
        /**
         * Performs a Linear Interpolation between vecA and vecB using the tValue
         * and returns the result in dest vec2 or a new vec2 object.
         * tvalue is not clamped* Performs a Linear Interpolation between vecA and vecB using the tValue
         * and returns the result in dest vec2 or a new vec2 object
         *
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @param {number} tValue
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.lerpUnclamped = function (vecA, vecB, tValue, dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = ((1.0 - tValue) * vecA.x) + (tValue * vecB.x);
            dest.y = ((1.0 - tValue) * vecA.y) + (tValue * vecB.y);
            return dest;
        };
        vec2.moveTowards = function (current, target, maxDistanceDelta) {
            var a = new vec2();
            a.x = target.x - current.x;
            a.y = target.y - current.y;
            var magnitude = a.magnitude();
            var result = new vec2();
            if (magnitude <= maxDistanceDelta || magnitude == 0.0) {
                result = target;
            }
            else {
                result.x = current.x + a.x / magnitude * maxDistanceDelta;
                result.y = current.y + a.y / magnitude * maxDistanceDelta;
            }
            return result;
        };
        /**
         * Generates a random vec2 with the given scale and returns the result
         * in dest or a new vec2 object
         *
         * @static
         * @param {number} [scale=1.0] // default scale = 1.0
         * @param {vec2} [dest]        // optional destinatin vec2
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.random = function (scale, dest) {
            if (scale === void 0) { scale = 1.0; }
            if (!dest) {
                dest = new vec2();
            }
            var result = Math.random() * 2.0 * Math.PI;
            dest.x = Math.cos(result) * scale;
            dest.y = Math.sin(result) * scale;
            return dest;
        };
        /**
         * Returns true if the vecA has the same elements in the same position as vecB
         * otherwise returns false
         *
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @returns {boolean}
         * @memberof vec2
         */
        vec2.exactEquals = function (vecA, vecB) {
            return ((vecA.x === vecB.x) && (vecA.y === vecB.y));
        };
        /**
         * Returns true if vecA has approximately the same elements in the same position as vecB
         * otherwise returns false
         *
         * @static
         * @param {vec2} vecA
         * @param {vec2} vecB
         * @returns {boolean}
         * @memberof vec2
         */
        vec2.equals = function (vecA, vecB) {
            var x1 = vecA.x;
            var x2 = vecB.x;
            var y1 = vecA.y;
            var y2 = vecB.y;
            return (Math.abs(x1 - x2) <= glm.EPSILON * Math.max(1.0, Math.abs(x1), Math.abs(x2)) &&
                Math.abs(y1 - y2) <= glm.EPSILON * Math.max(1.0, Math.abs(y1), Math.abs(y2)));
        };
        vec2.reflect = function (inDirection, inNormal, dest) {
            if (!dest) {
                dest = new vec2();
            }
            var dot = vec2.dot(inNormal, inDirection);
            dest.x = -2.0 * dot * inNormal.x + inDirection.x;
            dest.y = -2.0 * dot * inNormal.y + inDirection.y;
            return dest;
        };
        /**
         * Returns the angle between two vec2 objects
         * calculated from the origin (0, 0)
         *
         * @static
         * @param {vec2} from
         * @param {vec2} to
         * @returns {number}
         * @memberof vec2
         */
        vec2.angle = function (from, to) {
            var fromNorm = from.normalized();
            var toNorm = to.normalized();
            var dot = vec2.dot(fromNorm, toNorm);
            var dotClamp = glm.clamp(dot, -1.0, 1.0);
            var angleRadians = Math.acos(dotClamp);
            return angleRadians * glm.Rad2Deg;
        };
        /**
         * Finds the angle from vecA to vecB
         * Assuming angle is not the origin
         * Zero degrees starts to the right of the origin (East)
         * Positive 90 is up
         * Negative 90 is down
         *
         * @static
         * @param {vec2} from
         * @param {vec2} to
         * @returns {number}
         * @memberof vec2
         */
        vec2.angleOfAttack = function (from, to, is360) {
            if (is360 === void 0) { is360 = false; }
            var diff = glm.vec2.subtract(from, to);
            var angleRadians = Math.atan2(diff.y, diff.x);
            var angle = angleRadians * -glm.Rad2Deg;
            if (is360 && angle < 0) {
                angle = 360 + angle;
            }
            return angle;
        };
        /**
         * Returns the singed angle between two vec2 objects
         * calculated from thd origin (0, 0)
         *
         * @static
         * @param {vec2} from
         * @param {vec2} to
         * @returns {number}
         * @memberof vec2
         */
        vec2.signedAngle = function (from, to) {
            var normalized = from.normalized();
            var normalized2 = to.normalized();
            var num = Math.acos(glm.clamp(vec2.dot(normalized, normalized2), -1.0, 1.0)) * glm.Rad2Deg;
            var num2 = glm.sign(normalized.x * normalized2.y - normalized.y * normalized2.x);
            return num * num2;
        };
        /**
         * Determines the direction from vecA to vecB and stores the result in dest
         * The direction result is a vector that can be used to multiply against speed
         *
         *
         * @static
         * @param {vec2} from
         * @param {vec2} to
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.direction = function (from, to) {
            var result = new glm.vec2();
            // returns a vec2 that equals (0, 0) if both from and to are the same
            if (glm.vec2.equals(from, to)) {
                return result;
            }
            var angle = glm.vec2.angleOfAttack(from, to);
            result.x = Math.cos(angle * glm.Deg2Rad);
            result.y = Math.sin(angle * glm.Deg2Rad);
            // sanitizes components of result
            result.x = glm.Sanitize(result.x);
            result.y = glm.Sanitize(result.y);
            return result;
        };
        /**
         * Shorthand for writing vec2(0, -1). Stores the new vec2 in dest
         * or creates a new vec2 object
         *
         * @static
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.down = function (dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = 0;
            dest.y = -1;
            return dest;
        };
        /**
         * Shorthand for writing vec2(-1, 0). Stores the new vec2 in dest
         * or creates a new vec2 object
         *
         * @static
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.left = function (dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = -1;
            dest.y = 0;
            return dest;
        };
        /**
         * Shorthand for writing vec2(1, 0). Stores the new vec2 in dest
         * or creates a new vec2 object
         *
         * @static
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.right = function (dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = 1;
            dest.y = 0;
            return dest;
        };
        /**
         * Shorthand for writing vec2(0, 1). Stores the new vec2 in dest
         * or creates a new vec2 object
         *
         * @static
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.up = function (dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = 0;
            dest.y = 1;
            return dest;
        };
        /**
         * Shorthand for writing vec2(0, 0). Stores the new vec2 in dest
         * or creates a new vec2 object
         *
         * @static
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.zero = function (dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = 0;
            dest.y = 0;
            return dest;
        };
        /**
         * Shorthand for writing vec2(1, 1). Stores the new vec2 in dest
         * or creates a new vec2 object
         *
         * @static
         * @param {vec2} [dest]
         * @returns {vec2}
         * @memberof vec2
         */
        vec2.one = function (dest) {
            if (!dest) {
                dest = new vec2();
            }
            dest.x = 1;
            dest.y = 1;
            return dest;
        };
        return vec2;
    }(glm.Vector));
    glm.vec2 = vec2;
})(glm || (glm = {}));
var glm;
(function (glm) {
    var vec3 = /** @class */ (function (_super) {
        __extends(vec3, _super);
        function vec3(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            var _this = this;
            var thisX;
            var thisY;
            var thisZ;
            if (typeof x != 'number') {
                thisX = x.x;
                thisY = x.y;
                thisZ = y;
            }
            else {
                thisX = x;
                thisY = y;
                thisZ = z;
            }
            _this = _super.call(this, thisX, thisY, thisZ) || this;
            return _this;
        }
        Object.defineProperty(vec3.prototype, "xyz", {
            // PUBLIC GETTERS AND SETTERS
            get: function () {
                return new glm.Vector(this.x, this.y, this.z);
            },
            set: function (vec) {
                this.x = vec.x;
                this.y = vec.y;
                this.z = vec.z;
                this.w = 1.0;
            },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS
        vec3.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")";
        };
        return vec3;
    }(glm.Vector));
    glm.vec3 = vec3;
})(glm || (glm = {}));
var managers;
(function (managers) {
    var assetManifest = [
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "restartButton", src: "./Assets/images/restartButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "explosionParticle", src: "./Assets/images/explosionParticle.png" },
        { id: "flameParticle", src: "./Assets/images/flameParticle.png" },
        { id: "plane", src: "./Assets/images/plane.png" },
    ];
    var AssetManager = /** @class */ (function (_super) {
        __extends(AssetManager, _super);
        function AssetManager() {
            var _this = _super.call(this) || this;
            _this.manifest = new Array();
            _this.manifest = assetManifest;
            _this.installPlugin(createjs.Sound);
            _this.loadManifest(_this.manifest);
            return _this;
        }
        AssetManager.prototype.addItem = function (id, src) {
            this.manifest.push({ id: id, src: src });
            this.loadManifest(this.manifest);
        };
        return AssetManager;
    }(createjs.LoadQueue));
    managers.AssetManager = AssetManager;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var GamePad = /** @class */ (function () {
        // CONSTRUCTORS
        function GamePad(player, gamepadIndex) {
            this.axis = new Array();
            this.direction = 0;
            this.player = player;
            this._gamepadIndex = gamepadIndex;
        }
        GamePad.prototype.GetInput = function () {
            this._gamepad = window.navigator.getGamepads()[this._gamepadIndex];
            if (this._gamepad) {
                // check Buttons
                for (var button = 0; button < this._gamepad.buttons.length; button++) {
                    if (this._gamepad.buttons[button].pressed) {
                        console.log("button " + button + " pressed");
                    }
                }
                // check Axes
                for (var index = 0; index < this._gamepad.axes.length; index++) {
                    if ((this._gamepad.axes[index] > 0.2) || (this._gamepad.axes[index] < -0.2)) {
                        this.axis[index] = this._gamepad.axes[index];
                        /*
                        if((index == 1) && (this.axis[index] > 0)) {
                          this.axis[index] = 0; // don't allow backward movement
                        }
                        */
                    }
                    else if ((this._gamepad.axes[index] > -0.2) && (this._gamepad.axes[index] < 0.2)) {
                        this.axis[index] = 0;
                    }
                } // end check Axes
            } // end check if gamepad is connected
        };
        GamePad.prototype.MovePlayer = function () {
            // correct direction
            var newDirection = 90 - this.player.rotation;
            this.direction = newDirection;
            if (newDirection > 360) {
                this.direction -= 360;
            }
            if (newDirection < 0) {
                this.direction += 360;
            }
            // forward and back movement
            this.player.x -= this.axis[config.Gamepad.VERTICAL] * 5 * Math.cos(this.direction * (Math.PI / 180));
            this.player.y += this.axis[config.Gamepad.VERTICAL] * 5 * Math.sin(this.direction * (Math.PI / 180));
            // left and right movement
            this.player.x += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.sin(this.direction * (Math.PI / 180));
            this.player.y += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.cos(this.direction * (Math.PI / 180));
            // change direction
            this.player.rotation += this.axis[config.Gamepad.ROTATION] * 2;
        };
        GamePad.prototype.Update = function () {
            this.GetInput();
            this.MovePlayer();
        };
        return GamePad;
    }());
    managers.GamePad = GamePad;
})(managers || (managers = {}));
var managers;
(function (managers) {
    // Keyboard Class +++++++++++++++
    var Keyboard = /** @class */ (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++
        function Keyboard(player) {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
            this.player = player;
        }
        // PUBLIC METHODS
        Keyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case config.Key.UP_ARROW:
                case config.Key.W:
                    this.moveForward = true;
                    break;
                case config.Key.LEFT_ARROW:
                case config.Key.A:
                    this.moveLeft = true;
                    break;
                case config.Key.DOWN_ARROW:
                case config.Key.S:
                    this.moveBackward = true;
                    break;
                case config.Key.RIGHT_ARROW:
                case config.Key.D:
                    this.moveRight = true;
                    break;
                case config.Key.SPACEBAR:
                    this.jump = true;
                    break;
                case 81:/* pause */ 
                    this.paused = (this.paused) ? false : true;
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Key.UP_ARROW:
                case config.Key.W:
                    this.moveForward = false;
                    break;
                case config.Key.LEFT_ARROW:
                case config.Key.A:
                    this.moveLeft = false;
                    break;
                case config.Key.DOWN_ARROW:
                case config.Key.S:
                    this.moveBackward = false;
                    break;
                case config.Key.RIGHT_ARROW:
                case config.Key.D:
                    this.moveRight = false;
                    break;
                case config.Key.SPACEBAR:
                    this.jump = false;
                    break;
            }
        };
        Keyboard.prototype.MovePlayer = function () {
            // correct direction
            var direction = (this.player.rotation - 90) * -1;
            // uncomment the following for Regular player movement not following player's direction
            /*
            if(this.moveRight) {
              this.player.x += 5;
            }
            if(this.moveLeft) {
              this.player.x -= 5;
            }
      
            if(this.moveForward) {
              this.player.y -= 5;
            }
            if(this.moveBackward) {
              this.player.y += 5;
            }
            */
            // uncomment the following lines to have the keyboard buttons follow player's direction
            if (this.moveForward) {
                this.player.x += 5 * Math.cos(direction * (Math.PI / 180.0));
                this.player.y -= 5 * Math.sin(direction * (Math.PI / 180.0));
            }
            if (this.moveBackward) {
                this.player.x -= 5 * Math.cos(direction * (Math.PI / 180.0));
                this.player.y += 5 * Math.sin(direction * (Math.PI / 180.0));
            }
            if (this.moveRight) {
                this.player.x += 2 * Math.sin(direction * (Math.PI / 180));
                this.player.y += 2 * Math.cos(direction * (Math.PI / 180));
            }
            if (this.moveLeft) {
                this.player.x -= 2 * Math.sin(direction * (Math.PI / 180));
                this.player.y -= 2 * Math.cos(direction * (Math.PI / 180));
            }
        };
        Keyboard.prototype.Update = function () {
            this.MovePlayer();
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
var managers;
(function (managers) {
    // Mouse Class +++++++++++++++
    var Mouse = /** @class */ (function () {
        // CONSTRUCTOR +++++++++++++++++++++++
        function Mouse(player) {
            this.player = player;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        Mouse.prototype.PlayerFollowMouse = function () {
            this._dx = objects.Game.stage.mouseX - this.player.x;
            this._dy = objects.Game.stage.mouseY - this.player.y;
            // find the angle of rotation
            this.direction = Math.atan2(this._dy, this._dx) * (180 / Math.PI) + 90;
            this.player.rotation = this.direction;
        };
        Mouse.prototype.Update = function () {
            this.PlayerFollowMouse();
        };
        return Mouse;
    }());
    managers.Mouse = Mouse;
})(managers || (managers = {}));
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(buttonName, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, objects.Game.assetManager.getResult(buttonName)) || this;
            if (isCentered) {
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getBounds().height * 0.5;
            }
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this._Over);
            _this.on("mouseout", _this._Out);
            return _this;
        }
        // PRIVATE METHODS
        Button.prototype._Over = function (event) {
            this.alpha = 0.8;
        };
        Button.prototype._Out = function (event) {
            this.alpha = 1.0;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.assetManager = new managers.AssetManager();
        return Game;
    }());
    objects.Game = Game;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function GameObject(imageString) {
            var _this = _super.call(this, objects.Game.assetManager.getResult(imageString)) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // PROTECTED METHODS
        GameObject.prototype._initialize = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new createjs.Point(this.x, this.y);
            this.isColliding = false;
        };
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(text, fontSize, fontFamily, color, x, y, isCentered) {
            if (fontSize === void 0) { fontSize = "40px"; }
            if (fontFamily === void 0) { fontFamily = "Consolas"; }
            if (color === void 0) { color = "#000000"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, text, fontSize + " " + fontFamily, color) || this;
            if (isCentered) {
                _this.regX = _this.getMeasuredWidth() * 0.5;
                _this.regY = _this.getMeasuredHeight() * 0.5;
            }
            _this.x = x;
            _this.y = y;
            return _this;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Particle = /** @class */ (function (_super) {
        __extends(Particle, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Particle(type, color, size) {
            if (type === void 0) { type = "circle"; }
            if (color === void 0) { color = objects.Color.Red(); }
            if (size === void 0) { size = 50; }
            var _this = _super.call(this) || this;
            // PUBLIC INSTANCE VARIABLES
            _this.velocity = new glm.vec2();
            _this.acceleration = new glm.vec2();
            _this.force = new glm.vec2();
            _this.mass = 1.0;
            _this.life = 0; // lifetime remaining in seconds
            _this.color = color;
            _this.size = size;
            _this.type = type;
            _this._initialize();
            return _this;
        }
        Object.defineProperty(Particle.prototype, "size", {
            // PUBLIC PROPERTIES
            /**
             * This property returns the size of the particle in pixels
             *
             * @type {number}
             * @memberof Particle
             */
            get: function () {
                return this._size;
            },
            /**
             * This property sets the size of the particle in pixels
             *
             * @memberof Particle
             */
            set: function (newSize) {
                this._size = newSize;
                if (this.shape) {
                    switch (this.type) {
                        case "circle":
                            this._setCircleGraphics();
                            this._setCircleCache();
                            break;
                        case "square":
                            this._setSquareGraphics();
                            this._setSquareCache();
                            break;
                        case "triangle":
                            this._setTriangleGraphics();
                            this._setTriangleCache();
                            break;
                        case "hexagon":
                            this._setHexagonGraphics();
                            this._setHexagonCache();
                            break;
                        case "star":
                            this._setStarGraphics();
                            this._setStarCache();
                            break;
                        case "explosion":
                        case "flame":
                            this.shape.scaleX = this._size / this.shapeWidth;
                            this.shape.scaleY = this._size / this.shapeHeight;
                            break;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "color", {
            /**
             * This property returns the color of the particle
             *
             * @type {objects.Color}
             * @memberof Particle
             */
            get: function () {
                return this._color;
            },
            /**
             * This property sets the color of the particle
             *
             * @memberof Particle
             */
            set: function (newColor) {
                this.filters = [new createjs.ColorFilter(newColor.r / 255.0, newColor.g / 255.0, newColor.b / 255.0, newColor.a / 255.0)];
                if (this.shape) {
                    switch (this.type) {
                        case "circle":
                            this._setCircleGraphics();
                            break;
                        case "square":
                            this._setSquareGraphics();
                            break;
                        case "triangle":
                            this._setTriangleGraphics();
                            break;
                        case "hexagon":
                            this._setHexagonGraphics();
                            break;
                        case "star":
                            this._setStarGraphics();
                            break;
                        case "explosion":
                        case "flame":
                            this.shape.filters = this.filters;
                            this.shape.updateCache();
                            break;
                    }
                }
                this._color = newColor;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Particle.prototype._initialize = function () {
            var filter = new createjs.ColorFilter(this.color.r / 255.0, this.color.g / 255.0, this.color.b / 255.0, this.color.a / 255.0);
            this.filters = [filter];
            switch (this.type) {
                case "circle":
                    this.graphics = new createjs.Graphics();
                    this._setCircleGraphics();
                    this.shape = new createjs.Shape(this.graphics);
                    this._setCircleCache();
                    break;
                case "square":
                    this.graphics = new createjs.Graphics();
                    this._setSquareGraphics();
                    this.shape = new createjs.Shape(this.graphics);
                    this._setSquareCache();
                    break;
                case "triangle":
                    this.graphics = new createjs.Graphics();
                    this._setTriangleGraphics();
                    this.shape = new createjs.Shape(this.graphics);
                    this._setTriangleCache();
                    break;
                case "hexagon":
                    this.graphics = new createjs.Graphics();
                    this._setHexagonGraphics();
                    this.shape = new createjs.Shape(this.graphics);
                    this._setHexagonCache();
                    break;
                case "star":
                    this.graphics = new createjs.Graphics();
                    this._setStarGraphics();
                    this.shape = new createjs.Shape(this.graphics);
                    this._setStarCache();
                    break;
                case "explosion":
                    this.shape = new createjs.Bitmap(objects.Game.assetManager.getResult("explosionParticle"));
                    this.shapeWidth = this.shape.getBounds().width;
                    this.shapeHeight = this.shape.getBounds().height;
                    this._setBitmapParticleCache();
                    break;
                case "flame":
                    this.shape = new createjs.Bitmap(objects.Game.assetManager.getResult("flameParticle"));
                    this.shapeWidth = this.shape.getBounds().width;
                    this.shapeHeight = this.shape.getBounds().height;
                    this._setBitmapParticleCache();
                    break;
                default:
                    this.shape = new createjs.Shape();
                    break;
            }
        };
        Particle.prototype._setBitmapParticleCache = function () {
            this.shape.regX = this.shapeWidth * 0.5;
            this.shape.regY = this.shapeHeight * 0.5;
            this.shape.filters = this.filters;
            //this.shape.cache(0, 0, this.shape.getBounds().width, this.shape.getBounds().height, 1);
            this.shape.cache(0, 0, this.shapeWidth, this.shapeHeight, 1);
        };
        Particle.prototype._setSquareCache = function () {
            this.shape.filters = this.filters;
            //this.shape.cache(-this.size, -this.size, this.size * 2, this.size * 2, 1);
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        };
        Particle.prototype._setCircleCache = function () {
            this.shape.filters = this.filters;
            //this.shape.cache(-this.size, -this.size, this.size * 2, this.size * 2, 1);
        };
        Particle.prototype._setTriangleCache = function () {
            this.shape.filters = this.filters;
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        };
        Particle.prototype._setHexagonCache = function () {
            this.shape.filters = this.filters;
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        };
        Particle.prototype._setStarCache = function () {
            this.shape.filters = this.filters;
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        };
        Particle.prototype._setCircleGraphics = function () {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawCircle(0, 0, this.size);
            this.graphics.endFill();
        };
        Particle.prototype._setSquareGraphics = function () {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawRect(0, 0, this.size, this.size);
            this.graphics.endFill();
        };
        Particle.prototype._setTriangleGraphics = function () {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawPolyStar(0, 0, this.size, 3, 0, 90);
            this.graphics.endFill();
        };
        Particle.prototype._setHexagonGraphics = function () {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawPolyStar(0, 0, this.size, 6, 0, 90);
            this.graphics.endFill();
        };
        Particle.prototype._setStarGraphics = function () {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawPolyStar(0, 0, this.size, 5, 0.5, 90);
            this.graphics.endFill();
        };
        // PUBLIC METHODS
        Particle.prototype.Update = function () {
            this.force.x /= this.mass;
            this.force.y /= this.mass;
            this.acceleration = this.acceleration.add(this.force);
            this.velocity = this.velocity.add(this.acceleration);
            this.force.x *= 0.0;
            this.force.y *= 0.0;
            this.acceleration.x *= 0.0;
            this.acceleration.y *= 0.0;
            this.shape.x = this.x;
            this.shape.y = this.y;
        };
        Particle.prototype.Seek = function (target, strength) {
            var targetVector = new glm.vec2();
            targetVector = targetVector.subtract(new glm.vec2(this.x, this.y));
            var length = glm.vec2.magnitude(targetVector);
            if (length > 0.0) {
                targetVector = targetVector.divide(new glm.vec2(length, length));
                targetVector = targetVector.multiply(new glm.vec2(strength, strength));
                return targetVector;
            }
            else {
                return new glm.vec2();
            }
        };
        // move toward/away from target, but only within radius
        Particle.prototype.Attract = function (target, strength, radius, minRange) {
            if (minRange === void 0) { minRange = glm.EPSILON; }
            var targetVector = target.subtract(new glm.vec2(this.x, this.y));
            var length2 = targetVector.sqrMagnitude();
            var rad2 = radius * radius;
            var result = new glm.vec2();
            if (length2 > (minRange * minRange)) {
                if (length2 < rad2) {
                    length2 = Math.sqrt(length2) * strength;
                    targetVector.x /= length2;
                    targetVector.y /= length2;
                    result = targetVector.subtract(this.velocity);
                }
            }
            else {
                result = new glm.vec2();
            }
            return result;
        };
        //power = scale / distance^2. capped power, min range within which produces a zero output.
        Particle.prototype.Gravitate = function (target, strength, powerCap, minRange) {
            if (minRange === void 0) { minRange = glm.EPSILON; }
            var targetVector = target.subtract(new glm.vec2(this.x, this.y));
            var length2 = targetVector.sqrMagnitude();
            var result = new glm.vec2();
            if (length2 > (minRange * minRange)) {
                var power = strength / (length2);
                power = Math.min(power, powerCap);
                targetVector.x /= Math.sqrt(length2);
                targetVector.y /= Math.sqrt(length2);
                targetVector.x *= power;
                targetVector.y *= power;
                result = targetVector;
            }
            else {
                result = new glm.vec2();
            }
            return result;
        };
        //steering behaviours that take velocity into account
        //like seek, but takes velocity into account
        Particle.prototype.Steer = function (target, strength, powerCap) {
            var targetVector = target.subtract(new glm.vec2(this.x, this.y));
            var length = glm.vec2.magnitude(targetVector);
            if (length > 0.0) {
                targetVector.x *= (strength / length);
                targetVector.y *= (strength / length);
                targetVector = targetVector.subtract(this.velocity);
                var result = targetVector;
                length = glm.vec2.magnitude(result);
                if (length > powerCap) {
                    powerCap /= length;
                    result.x *= powerCap;
                    result.y *= powerCap;
                    return result;
                }
            }
            return new glm.vec2();
        };
        //move toward target, slow down at the target
        Particle.prototype.Arrive = function (target, strength, radius, powerCap) {
            var targetVector = target.subtract(new glm.vec2(this.x, this.y));
            //faster than length() < radius
            var length2 = glm.vec2.squaredMagnitude(targetVector);
            var rad2 = radius * radius;
            var result = new glm.vec2();
            if (length2 < rad2) {
                radius *= strength;
                targetVector.x /= radius;
                targetVector.y /= radius;
                result = targetVector.subtract(this.velocity);
            }
            else {
                length2 = Math.sqrt(length2) * strength;
                targetVector.x /= length2;
                targetVector.y /= length2;
                result = targetVector.subtract(this.velocity);
            }
            var length = result.magnitude();
            if (length > powerCap) {
                powerCap /= length;
                result.x *= powerCap;
                result.y *= powerCap;
                return result;
            }
            return result;
        };
        Particle.prototype.setScale = function (size) {
            this.shape.scaleX = size;
            this.shape.scaleY = size;
        };
        Particle.prototype.getPosition = function () {
            return new glm.vec2(this.x, this.y);
        };
        return Particle;
    }(createjs.DisplayObject));
    objects.Particle = Particle;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var ParticleEmitter = /** @class */ (function (_super) {
        __extends(ParticleEmitter, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++
        function ParticleEmitter() {
            var _this = _super.call(this) || this;
            _this._emissionTime = 0;
            _this._timeRemaining = 0;
            _this.emissionShape = config.Emitter.ARC;
            _this.emissionRate = 10.0;
            _this.circleRadius = 10.0;
            _this.arcRadius = 200.0; // how far from emitter origin
            _this.arcAngle = 30.0; // the width of the arc
            _this.arcDirection = 90.0; // initial direction of arc
            // Emitter Playback
            _this.playing = true;
            _this.loop = true;
            _this.loopDelay = 0.0;
            _this.duration = -1.0; //negative duration means infinites
            // Particle Path Following
            _this.followPath = false;
            _this.directFollowMode = false;
            _this.lookAhead = 10.0; // how far ahead particles will seek
            _this.pathRadius = 10.0;
            _this.pathPower = 10.0; //treated like speed in direct mode, like force otherwise
            // Particlee Steering
            _this.seekingBehaviours = false;
            _this.steeringBehaviours = false;
            _this.seekForce = 0.0;
            _this.steerForce = 0.0;
            _this.steerMaxForce = 0.0;
            _this.gravitatePower = 0.0;
            _this.gravitateMaxForce = 0.0;
            _this.attractForce = 0.0;
            _this.attractRange = 0.0;
            _this.arriveForce = 0.0;
            _this.arriveRange = 0.0;
            _this.arriveMaxForce = 0.0;
            _this.globalEffects = false;
            _this.globalForceVector = new glm.vec2();
            _this.globalAccelerationVector = new glm.vec2(0.0, -10.0);
            // Particle default settings
            _this.limitSpeedOverLifetime = false;
            _this.initialSpeedLimitRange = new glm.vec2();
            _this.finalSpeedLimitRange = new glm.vec2();
            _this.sizeOverLifetime = false;
            _this.spinOverLifetime = false;
            _this.colourOverLifetime = false;
            _this.particleType = "circle";
            _this.position = new glm.vec2();
            _this.initialize(1);
            return _this;
        }
        // PRIVATE METHODs
        ParticleEmitter.prototype._emitFromRectangle = function (particle) {
            var pos = new glm.vec2();
            pos.x = glm.RandomRange(this.rectangleSize.x * -0.5, this.rectangleSize.x * 0.5);
            pos.y = glm.RandomRange(this.rectangleSize.y * -0.5, this.rectangleSize.y * 0.5);
            particle.x = pos.x;
            particle.y = pos.y;
            particle.velocity = new glm.vec2(0.0, -2.0); // up direction
        };
        ParticleEmitter.prototype._emitFromCircle = function (particle) {
            particle.x = 0;
            particle.y = 0;
            var randomAngle = glm.RandomRange(0.0, 360) * glm.Deg2Rad;
            var randomSpeed = glm.RandomRange(1.0, 2.0);
            var direction = new glm.vec2();
            direction.x = randomSpeed * Math.cos(randomAngle);
            direction.y = randomSpeed * Math.sin(randomAngle);
            particle.velocity = direction;
        };
        ParticleEmitter.prototype._emitFromArc = function (particle) {
            particle.x = 0;
            particle.y = 0;
            //this.arcTopRight = new glm.vec2(this.arcRadius * Math.cos(this.arcAngle * glm.Deg2Rad),
            //                                -this.arcRadius * Math.sin(this.arcAngle * glm.Deg2Rad));
            //this.arcTopLeft = new glm.vec2(-this.arcRadius * Math.cos(this.arcAngle * glm.Deg2Rad),
            //                                -this.arcRadius * Math.sin(this.arcAngle * glm.Deg2Rad));
            var halfArcAngle = this.arcAngle * 1.0;
            var randomAngle = glm.RandomRange(80, 110);
            var randomSpeed = glm.RandomRange(1.0, 2.0);
            var direction = glm.vec2.direction(glm.vec2.zero(), new glm.vec2());
            // let direction: glm.vec2 = new glm.vec2();
            // direction.x = randomSpeed * Math.cos(randomAngle);
            // direction.y = randomSpeed * Math.sin(randomAngle);
            //console.log(direction.x);
            if (direction.y > 0) {
                direction.y *= -1;
            }
            console.log("direction: " + direction.toString());
            console.log("angle: " + randomAngle);
            particle.velocity = direction;
        };
        ParticleEmitter.prototype.buildEmitter = function (numParticles) {
            if (numParticles > 0) {
                this._particles = new Array();
                this._numberOfParticles = numParticles;
            }
            for (var index = 0; index < this._numberOfParticles; index++) {
                this._particles.push(new objects.Particle(this.particleType));
            }
        };
        // PUBLIC METHODS
        ParticleEmitter.prototype.initialize = function (numParticles) {
            this.freeMemory(); // destroy any existing particles
            this.buildEmitter(numParticles);
            this._timeRemaining = this.duration;
            //transforms
            this.x = this.position.x;
            this.y = this.position.y;
            this.rotation = 0;
            //emitter properties
            this.rotationalVelocity = 0;
            this.emitterOffset = new glm.vec2();
            this.emissionRate = 50.0;
            // shape properties
            this.rectangleSize = new glm.vec2(10.0, 10.0);
            // playback properties
            this.playing = true;
            this.loop = true;
            this.loopDelay = 0.0;
            this.duration = -1;
            // path options
            this.followPath = false;
            this.directFollowMode = false;
            this.lookAhead = 0.1;
            this.pathRadius = 0.1;
            this.pathPower = 200.0;
            // seek options
            this.seekingBehaviours = false;
            this.seekPoint = new glm.vec2();
            this.seekForce = 0.0;
            // steer options
            this.steeringBehaviours = false;
            this.steerPoint = new glm.vec2();
            this.steerForce = 0.0;
            this.steerMaxForce = 1.0;
            // gravitate options
            this.gravitatePoint = new glm.vec2();
            this.gravitatePower = 0.0;
            this.gravitateMaxForce = 1.0;
            // attract options
            this.attractPoint = new glm.vec2();
            this.attractForce = 0.0;
            this.attractRange = 10.0;
            // arrive options
            this.arrivePoint = new glm.vec2();
            this.arriveForce = 0.0;
            this.arriveRange = 10.0;
            this.arriveMaxForce = 1.0;
            // gravity and global effects
            this.globalEffects = false;
            this.globalForceVector = new glm.vec2(0.0, -1.0);
            this.globalAccelerationVector = new glm.vec2(0.0, 10.0);
            // Speed Options
            this.limitSpeedOverLifetime = true;
            this.initialSpeedRange = new glm.vec2(20.0, 30.0);
            this.initialSpeedLimitRange = new glm.vec2(40.0, 50.0);
            this.finalSpeedLimitRange = new glm.vec2(40.0, 50.0);
            this.lifeRange = new glm.vec2(4.0, 7.0);
            // Size Options
            this.sizeOverLifetime = true;
            this.sizeRangeBegin = new glm.vec2(20.0, 30.0);
            this.sizeRangeEnd = new glm.vec2(0.5, 1.0);
            this.massRange = new glm.vec2(0.5, 1.0);
            // Rotation Options
            this.spinOverLifetime = true;
            this.spinBegin = -1.0;
            this.spinEnd = 1.0;
            // Colour Options
            this.colourOverLifetime = true;
            this.colourBegin0 = objects.Color.Red();
            this.colourBegin1 = objects.Color.DarkOrange();
            this.colourEnd0 = objects.Color.Black();
            this.colourEnd1 = objects.Color.DarkGrey();
        };
        ParticleEmitter.prototype.killParticles = function () {
            this._particles.forEach(function (particle) {
                particle.life = -1;
            });
        };
        ParticleEmitter.prototype.freeMemory = function () {
            if (this._particles) {
                this.removeAllChildren();
                delete this._particles;
                this._particles = null;
                this._numberOfParticles = 0;
            }
        };
        ParticleEmitter.prototype.Update = function () {
            var _this = this;
            var dt = 0.1667;
            this.rotation += this.rotationalVelocity;
            if (this._particles && this.playing) {
                this._emissionTime += dt;
                this._timeRemaining -= dt;
                if (this._timeRemaining < 0.0) {
                    if (this.duration > 0.0) {
                        this._emissionTime = 0.0; //will prevent particles from spawning
                        if (this.loop) {
                            if (this._timeRemaining < -this.loopDelay) {
                                this.killParticles();
                                this.removeAllChildren();
                                this._timeRemaining = this.duration;
                            }
                        }
                    }
                }
                var NumParticlesToEmit_1 = this._emissionTime * this.emissionRate;
                // loop through each particle
                this._particles.forEach(function (particle) {
                    if ((particle.life <= 0.0) && (NumParticlesToEmit_1 > 0)) {
                        _this.spawnParticle(particle);
                        NumParticlesToEmit_1--;
                        _this._emissionTime -= (1.0 / _this.emissionRate);
                        _this.UpdateParticle(particle, dt);
                    }
                    else {
                        if (particle) {
                            _this.UpdateParticle(particle, dt);
                        }
                    }
                });
            }
        };
        ParticleEmitter.prototype.UpdateParticle = function (particle, dt) {
            // Update physics
            if (this.seekingBehaviours) {
                particle.force = particle.force.add(particle.Seek(this.seekPoint, this.seekForce));
                particle.force = particle.force.add(particle.Gravitate(this.gravitatePoint, this.gravitatePower, this.gravitateMaxForce));
                particle.force = particle.force.add(particle.Attract(this.attractPoint, this.attractForce, this.attractRange));
            }
            if (this.steeringBehaviours) {
                particle.force = particle.force.add(particle.Steer(this.steerPoint, this.steerForce, this.steerMaxForce));
                particle.force = particle.force.add(particle.Arrive(this.arrivePoint, this.arriveForce, this.arriveRange, this.arriveMaxForce));
            }
            if (this.globalEffects) {
                particle.force = particle.force.add(this.globalForceVector);
                particle.acceleration = particle.acceleration.add(this.globalAccelerationVector);
            }
            if (this.followPath) {
                if (this.directFollowMode) {
                    //this.applyDirectPathFollow(dt, particle);
                }
                else {
                    //this.applyPathSteering(dt, particle);
                }
            }
            if (!particle.lifespan) {
                particle.lifespan = 1.0;
            }
            var normalizedLife = glm.clamp(1.0 - (particle.life / particle.lifespan), 0.0, 1.0);
            if (this.sizeOverLifetime) {
                var size = glm.lerp(particle.sizeBegin, particle.sizeEnd, normalizedLife);
                particle.size = size;
            }
            if (this.colourOverLifetime) {
                if (!particle.colourBegin) {
                    particle.colourBegin = this.colourBegin0;
                    particle.colourEnd = this.colourEnd0;
                }
                var color = glm.lerpColor(particle.colourBegin, particle.colourEnd, normalizedLife);
                particle.color = color;
            }
            if (this.limitSpeedOverLifetime) {
                var speed = glm.lerp(particle.speedLimitBegin, particle.speedLimitEnd, normalizedLife);
                particle.velocity = glm.limitMagnitude(particle.velocity, speed);
            }
            if (this.spinOverLifetime) {
                var rotation = glm.lerp(this.spinBegin, this.spinEnd, normalizedLife);
                particle.shape.rotation += rotation;
            }
            else {
                particle.shape.rotation += glm.RandomRange(this.spinBegin, this.spinEnd);
            }
            // move particle
            particle.x += particle.velocity.x * dt;
            particle.y += particle.velocity.y * dt;
            particle.life -= dt;
            if (this.emissionShape == config.Emitter.CIRCLE) {
                if (glm.vec2.distance(glm.vec2.zero(), new glm.vec2(particle.x, particle.y)) >= this.circleRadius) {
                    particle.life = 0.0;
                }
            }
            if (this.emissionShape == config.Emitter.ARC) {
                if (glm.vec2.distance(glm.vec2.zero(), new glm.vec2(particle.x, particle.y)) >= this.arcRadius) {
                    particle.life = 0.0;
                }
            }
            // Update position
            particle.Update();
        };
        ParticleEmitter.prototype.spawnParticle = function (particle) {
            particle.colourBegin = glm.lerpColor(this.colourBegin0, this.colourBegin1, Math.random());
            particle.colourEnd = glm.lerpColor(this.colourEnd0, this.colourEnd1, Math.random());
            particle.lifespan = glm.lerp(this.lifeRange.x, this.lifeRange.y, Math.random());
            particle.life = particle.lifespan;
            var randomTval_A = Math.random();
            //couple mass and size relationship
            particle.mass = glm.lerp(this.massRange.x, this.massRange.y, randomTval_A);
            particle.sizeBegin = glm.lerp(this.sizeRangeBegin.x, this.sizeRangeBegin.y, randomTval_A);
            particle.sizeEnd = glm.lerp(this.sizeRangeEnd.x, this.sizeRangeEnd.y, randomTval_A);
            //emission shapes determine initial velocity and position distribution
            switch (this.emissionShape) {
                case config.Emitter.RECTANGLE:
                    {
                        this._emitFromRectangle(particle);
                        break;
                    }
                case config.Emitter.CIRCLE:
                    {
                        this._emitFromCircle(particle);
                        break;
                    }
                case config.Emitter.ARC:
                    {
                        this._emitFromArc(particle);
                        break;
                    }
                default:
                    this._emitFromCircle(particle);
                    break;
            }
            //emit functions will set a position and a normalized velocity
            var startspeed = glm.RandomRange(this.initialSpeedRange.x, this.initialSpeedRange.y);
            particle.velocity.x *= startspeed;
            particle.velocity.y *= startspeed;
            // particle.transform.move(this.emitterOffset);
            particle.speedLimitBegin = glm.RandomRange(this.initialSpeedLimitRange.x, this.initialSpeedLimitRange.y);
            particle.speedLimitEnd = glm.RandomRange(this.finalSpeedLimitRange.x, this.finalSpeedLimitRange.y);
            particle.distanceTravelledAlongPath = 0.0;
            particle.size = particle.sizeBegin;
            particle.color = glm.lerpColor(particle.colourBegin, particle.colourEnd, 0.5);
            this.addChildAt(particle.shape, 0);
        };
        ParticleEmitter.prototype.getNumberOfParticles = function () {
            return this._numberOfParticles;
        };
        ParticleEmitter.prototype.getParticle = function (index) {
            if (index >= this._numberOfParticles) {
                console.log("ParticleEmitter::getParticlePosition ERROR: idx " + index + " out of range!");
                return null;
            }
            return this._particles[index];
        };
        ParticleEmitter.prototype.getParticlePosition = function (index) {
            if (index >= this._numberOfParticles) {
                console.log("ParticleEmitter::getParticlePosition ERROR: idx " + index + " out of range!");
                return null;
            }
            return this._particles[index].getPosition();
        };
        ParticleEmitter.prototype.setNumberOfParticles = function (numParticles) {
            this.freeMemory();
            this.buildEmitter(numParticles);
        };
        ParticleEmitter.prototype.setLifeRange = function (min, max) {
            this.lifeRange = new glm.vec2(min, max);
        };
        ParticleEmitter.prototype.setSizeRangeBegin = function (min, max) {
            this.sizeRangeBegin = new glm.vec2(min, max);
        };
        ParticleEmitter.prototype.setSizeRangeEnd = function (min, max) {
            this.sizeRangeEnd = new glm.vec2(min, max);
        };
        ParticleEmitter.prototype.setParticleType = function (type) {
            this.particleType = type;
            var numParticles = this._numberOfParticles;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
        };
        ParticleEmitter.prototype.setCircleRadius = function (radius) {
            var numParticles = this._numberOfParticles;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.circleRadius = radius;
        };
        ParticleEmitter.prototype.setPosition = function (position) {
            this.position = position;
            this.x = position.x;
            this.y = position.y;
        };
        ParticleEmitter.prototype.setEmitterShape = function (type) {
            var numParticles = this._numberOfParticles;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.emissionShape = type;
        };
        ParticleEmitter.prototype.setRectangleWidth = function (width) {
            var numParticles = this._numberOfParticles;
            var height = this.rectangleSize.y;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.rectangleSize.x = width;
            this.rectangleSize.y = height;
        };
        ParticleEmitter.prototype.setRectangleHeight = function (height) {
            var numParticles = this._numberOfParticles;
            var width = this.rectangleSize.x;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.rectangleSize.x = width;
            this.rectangleSize.y = height;
        };
        return ParticleEmitter;
    }(createjs.Container));
    objects.ParticleEmitter = ParticleEmitter;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Plane() {
            var _this = _super.call(this, "plane") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            if (this.x >= config.Screen.WIDTH - this.halfWidth) {
                this.x = config.Screen.WIDTH - this.halfWidth;
            }
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if (this.y >= config.Screen.HEIGHT - this.halfHeight) {
                this.y = config.Screen.HEIGHT - this.halfHeight;
            }
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        // PUBLIC METHODS
        Plane.prototype.Start = function () {
            this.x = 320;
            this.y = 430;
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
        };
        Plane.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 35;
            this._checkBounds();
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Scene() {
            return _super.call(this) || this;
        }
        // PUBLIC METHODS
        /**
         * This method is used to setup scene objects
         *
         * @method Start
         * @memberof Scene
         * @returns {void}
         */
        Scene.prototype.Start = function () {
        };
        /**
         * This method updates components of the scene
         *
         * @method Update
         * @returns {number}
         * @memberof Scene
         */
        Scene.prototype.Update = function () {
            return 0;
        };
        /**
         * This method is the Main method of the scene where all the action happens
         *
         * @method Main
         * @returns {void}
         * @memberof Scene
         */
        Scene.prototype.Main = function () {
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Slider = /** @class */ (function (_super) {
        __extends(Slider, _super);
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
        function Slider(value, min, max, width, height, orientation, trackColor, thumbColor, x, y, isCentered) {
            if (value === void 0) { value = 50; }
            if (min === void 0) { min = 1; }
            if (max === void 0) { max = 100; }
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 20; }
            if (orientation === void 0) { orientation = "horizontal"; }
            if (trackColor === void 0) { trackColor = config.Color.WHITE_SMOKE; }
            if (thumbColor === void 0) { thumbColor = config.Color.DARK_GREY; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this) || this;
            // initialize properties
            _this._graphics = new createjs.Graphics();
            _this._min = min;
            _this._max = max;
            _this._width = width;
            _this._height = height;
            _this.value = value;
            _this._trackColor = new objects.Color(trackColor);
            _this._thumbColor = new objects.Color(thumbColor);
            _this.cursor = "pointer";
            _this._orientation = orientation;
            _this.on("mousedown", _this._sliderChange, _this);
            _this.on("pressmove", _this._sliderChange, _this);
            _this._buildSlider();
            _this.x = x;
            _this.y = y;
            if (isCentered) {
                _this.regX = _this._width * 0.5;
                _this.regY = _this._height * 0.5;
            }
            return _this;
        }
        Object.defineProperty(Slider.prototype, "value", {
            // PUBLIC PROPERTIES ++++++++++++++++++++++++++
            /**
             * Returns current value of the Slider object
             *
             * @type {number}
             * @memberof Slider
             */
            get: function () {
                return this._value;
            },
            /**
             * Sets the current value of the Slider object
             *
             * @memberof Slider
             */
            set: function (newValue) {
                if (this._value != newValue) {
                    this._value = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        /**
         * this method calls the build method for either horizontal or vertical orientation cases
         *
         * @private
         * @memberof Slider
         */
        Slider.prototype._buildSlider = function () {
            var position;
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
        };
        /**
         * This method builds a horizontal slider graphic
         *
         * @private
         * @memberof Slider
         */
        Slider.prototype._buildHorizontalSlider = function () {
            var position = (this._width - (this._height * 0.5)) * Math.max(0, Math.min(1, (this.value - this._min) / (this._max - this._min)));
            this._graphics.clear()
                .beginFill(this._trackColor.hex).drawRect(0, 0, this._width, this._height)
                .beginFill(this._thumbColor.hex).drawRect(position, 0, this._height * 0.5, this._height);
            this.graphics = this._graphics;
        };
        /**
         * This method builds a vertical slider graphic
         *
         * @private
         * @memberof Slider
         */
        Slider.prototype._buildVerticalSlider = function () {
            var position = (this._height - (this._width * 0.5)) * Math.max(0, Math.min(1, (this.value - this._min) / (this._max - this._min)));
            this._graphics.clear()
                .beginFill(this._trackColor.hex).drawRect(0, 0, this._width, this._height)
                .beginFill(this._thumbColor.hex).drawRect(0, this._height - (this._width * 0.5) - position, this._width, this._width * 0.5);
            this.graphics = this._graphics;
        };
        /**
         * This event handler changes the value of the slider object according to the mouse position
         *
         * @private
         * @param {createjs.MouseEvent} event
         * @returns
         * @memberof Slider
         */
        Slider.prototype._sliderChange = function (event) {
            var val;
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
        };
        // PUBLIC METHODS
        /**
         * Sets the position of the slider
         *
         * @param {number} x
         * @param {number} y
         * @memberof Slider
         */
        Slider.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        /**
         * Returns the position of the slider object as a vec2
         *
         * @returns {glm.vec2}
         * @memberof Slider
         */
        Slider.prototype.getPosition = function () {
            return new glm.vec2(this.x, this.y);
        };
        return Slider;
    }(createjs.Shape));
    objects.Slider = Slider;
})(objects || (objects = {}));
var scenes;
(function (scenes) {
    var Editor = /** @class */ (function (_super) {
        __extends(Editor, _super);
        //CONSTRUCTORS
        function Editor(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // register button event handlers
            _this._nextButtonClick = _this._nextButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Editor.prototype._nextButtonClick = function (event) {
            this._particleEmitter.playing = !this._particleEmitter.playing;
            //this._currentScene = config.Scene.PLAY;
            //this.removeAllChildren();
        };
        Editor.prototype._numberOfParticlesSliderChanged = function (event) {
            this._particleEmitter.setNumberOfParticles(this._numberOfParticlesSlider.value);
            this._numberOfParticlesSliderLabel.text = "Number: " + this._numberOfParticlesSlider.value.toFixed(0);
        };
        Editor.prototype._particleTypeSliderChanged = function (event) {
            switch (this._particleTypeSlider.value) {
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
            }
        };
        Editor.prototype._radiusSliderChanged = function (event) {
            this._circleRadiusSliderLabel.text = "Radius: " + this._circleRadiusSlider.value.toFixed(0);
            this._particleEmitter.setCircleRadius(this._circleRadiusSlider.value);
        };
        Editor.prototype._rectangleWidthSliderChanged = function (event) {
            this._rectangleWidthSliderLabel.text = "Width: " + this._rectangleWidthSlider.value.toFixed(0);
            this._particleEmitter.setRectangleWidth(this._rectangleWidthSlider.value);
        };
        Editor.prototype._rectangleHeightSliderChanged = function (event) {
            this._rectangleHeightSliderLabel.text = "Height: " + this._rectangleHeightSlider.value.toFixed(0);
            this._particleEmitter.setRectangleHeight(this._rectangleHeightSlider.value);
        };
        Editor.prototype._emitterShapeSliderChanged = function (event) {
            var emitterType;
            switch (this._emitterShapeSlider.value) {
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
        };
        // PUBLIC METHODS
        Editor.prototype.Start = function () {
            console.log("Particle System Editor");
            var labelColor = objects.Color.Black();
            this._startLabel = new objects.Label("Particle System Editor", "50px", "Consolas", labelColor.hex, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._nextButton = new objects.Button("nextButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this._particleEmitter = new objects.ParticleEmitter();
            this._particleEmitter.setNumberOfParticles(1);
            this._particleEmitter.setParticleType("hexagon");
            this._particleEmitter.setPosition(new glm.vec2(320, 300));
            this._numberOfParticlesSlider = new objects.Slider(200, 1, 1000, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 40, false);
            this._numberOfParticlesSliderLabel = new objects.Label("Number:", "20px", "Consolas", config.Color.BLACK, 200, 40, false);
            this._particleTypeSlider = new objects.Slider(0, 0, 4, 100, 20, "horizontal", config.Color.WHITE_SMOKE, config.Color.DARK_GREY, 320, 70, false);
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
        };
        Editor.prototype.Update = function () {
            this._particleEmitter.Update();
            return this._currentScene;
        };
        Editor.prototype.Main = function () {
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
        };
        return Editor;
    }(objects.Scene));
    scenes.Editor = Editor;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        //CONSTRUCTORS
        function End(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // Register Button Event Handlers
            _this._backButtonClick = _this._backButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        End.prototype._backButtonClick = function (event) {
            this._currentScene = config.Scene.PLAY;
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        End.prototype.Start = function () {
            this._startLabel = new objects.Label("End Scene", "60px", "Consolas", config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._backButton = new objects.Button("backButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this.Main();
        };
        End.prototype.Update = function () {
            return this._currentScene;
        };
        End.prototype.Main = function () {
            this.addChild(this._startLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", this._backButtonClick);
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        //CONSTRUCTORS
        function Play(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // register button event handlers
            _this._nextButtonClick = _this._nextButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Play.prototype._nextButtonClick = function (event) {
            this._currentScene = config.Scene.END;
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this._playLabel = new objects.Label("Play Scene", "60px", "Consolas", config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._nextButton = new objects.Button("nextButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this._player = new objects.Plane();
            // uncomment the next line to enable gamepad support
            //this._gamepad = new managers.GamePad(this._player, 0);
            this._mouse = new managers.Mouse(this._player);
            this._keyboard = new managers.Keyboard(this._player);
            this.Main();
        };
        Play.prototype.Update = function () {
            this._player.Update();
            // uncomment the next line to enable gamepad support
            // this._gamepad.Update();
            this._mouse.Update();
            this._keyboard.Update();
            return this._currentScene;
        };
        Play.prototype.Main = function () {
            this.addChild(this._playLabel);
            this.addChild(this._nextButton);
            this.addChild(this._player);
            this._nextButton.on("click", this._nextButtonClick);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        //CONSTRUCTORS
        function Start(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // register button event handlers
            _this._startButtonClick = _this._startButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Start.prototype._startButtonClick = function (event) {
            this._currentScene = config.Scene.EDITOR;
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            console.log("Start Scene");
            var labelColor = objects.Color.Black();
            this._startLabel = new objects.Label("Start Scene", "60px", "Consolas", labelColor.hex, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._startButton = new objects.Button("startButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this.Main();
        };
        Start.prototype.Update = function () {
            return this._currentScene;
        };
        Start.prototype.Main = function () {
            this.addChild(this._startLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", this._startButtonClick);
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map