module objects {
    export class Particle extends createjs.DisplayObject {
        private _color: objects.Color;
        private _size: number;

        // PUBLIC INSTANCE VARIABLES
        public velocity: glm.vec2 = new glm.vec2();
        public acceleration: glm.vec2 = new glm.vec2();
        public force: glm.vec2 = new glm.vec2();
        public mass: number = 1.0;

        public sizeBegin: number;
        public sizeEnd: number;

        public colourBegin: objects.Color;
        public colourEnd: objects.Color;
        public speedLimitBegin: number;
        public speedLimitEnd: number;
        public life: number = 0;// lifetime remaining in seconds
        public lifespan: number;
        public distanceTravelledAlongPath: number;

        public shape: createjs.Shape | createjs.Bitmap;
        public shapeWidth:number;
        public shapeHeight:number;
        public graphics: createjs.Graphics;
        public filters: createjs.Filter[];
        public type: string;

        // PUBLIC PROPERTIES

        /**
         * This property returns the size of the particle in pixels
         *
         * @type {number}
         * @memberof Particle
         */
        get size(): number {
            return this._size;
        }

        /**
         * This property sets the size of the particle in pixels
         *
         * @memberof Particle
         */
        set size(newSize: number) {
            this._size = newSize;
            if(this.shape) {

                switch(this.type) {
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
                        this.shape.scaleY = this._size / this.shapeHeight
                    break;
                }
            }

        }

        /**
         * This property returns the color of the particle
         *
         * @type {objects.Color}
         * @memberof Particle
         */
        get color(): objects.Color {
            return this._color;
        }

        /**
         * This property sets the color of the particle
         *
         * @memberof Particle
         */
        set color(newColor: objects.Color) {
            this.filters = [new createjs.ColorFilter(newColor.r / 255.0, newColor.g / 255.0, newColor.b / 255.0, newColor.a / 255.0)];

            if (this.shape) {
                switch(this.type) {
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
        }

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(type: string = "circle", color: objects.Color = objects.Color.Red(), size: number = 50) {
            super();

            this.color = color;
            this.size = size;
            this.type = type;

            this._initialize();
        }

        // PRIVATE METHODS
        private _initialize():void {
            let filter = new createjs.ColorFilter(this.color.r / 255.0, this.color.g / 255.0, this.color.b / 255.0, this.color.a / 255.0);
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
                    this.graphics =  new createjs.Graphics();
                    this._setTriangleGraphics();
                    this.shape = new createjs.Shape(this.graphics);
                    this._setTriangleCache();
                    break;
                case "hexagon":
                    this.graphics =  new createjs.Graphics();
                    this._setHexagonGraphics();
                    this.shape = new createjs.Shape(this.graphics);
                    this._setHexagonCache();
                    break;
                case "star":
                    this.graphics =  new createjs.Graphics();
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
        }

        private _setBitmapParticleCache() {
            this.shape.regX = this.shapeWidth * 0.5;
            this.shape.regY = this.shapeHeight * 0.5;
            this.shape.filters = this.filters;
            //this.shape.cache(0, 0, this.shape.getBounds().width, this.shape.getBounds().height, 1);
            this.shape.cache(0, 0, this.shapeWidth, this.shapeHeight, 1);
        }

        private _setSquareCache() {
            this.shape.filters = this.filters;
            //this.shape.cache(-this.size, -this.size, this.size * 2, this.size * 2, 1);
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        }

        private _setCircleCache() {
            this.shape.filters = this.filters;
            //this.shape.cache(-this.size, -this.size, this.size * 2, this.size * 2, 1);
        }

        private _setTriangleCache() {
            this.shape.filters = this.filters;
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        }

        private _setHexagonCache() {
            this.shape.filters = this.filters;
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        }

        private _setStarCache() {
            this.shape.filters = this.filters;
            this.shape.regX = this.size * 0.5;
            this.shape.regY = this.size * 0.5;
        }

        private _setCircleGraphics() {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawCircle(0, 0, this.size);
            this.graphics.endFill();
        }


        private _setSquareGraphics():void {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawRect(0, 0, this.size, this.size);
            this.graphics.endFill();
        }

        private _setTriangleGraphics():void {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawPolyStar(0, 0, this.size, 3, 0, 90);
            this.graphics.endFill();
        }

        private _setHexagonGraphics():void {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawPolyStar(0, 0, this.size, 6, 0, 90);
            this.graphics.endFill();
        }

        private _setStarGraphics():void {
            this.graphics.clear();
            this.graphics.beginFill(this.color.hex);
            this.graphics.drawPolyStar(0, 0, this.size, 5, 0.5, 90);
            this.graphics.endFill();
        }

        // PUBLIC METHODS
        public Update(): void {
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
        }


        public Seek(target: glm.vec2, strength: number): glm.vec2 {

            let targetVector: glm.vec2 = new glm.vec2();

            targetVector = targetVector.subtract(new glm.vec2(this.x, this.y));

            let length = glm.vec2.magnitude(targetVector);

            if (length > 0.0) {
                targetVector = targetVector.divide(new glm.vec2(length, length));
                targetVector = targetVector.multiply(new glm.vec2(strength, strength));
                return targetVector;
            }
            else {
                return new glm.vec2();
            }
        }

        // move toward/away from target, but only within radius
        public Attract(target: glm.vec2, strength: number, radius: number, minRange: number = glm.EPSILON): glm.vec2 {
            let targetVector: glm.vec2 = target.subtract(new glm.vec2(this.x, this.y));
            let length2 = targetVector.sqrMagnitude();
            let rad2 = radius * radius;

            let result: glm.vec2 = new glm.vec2();
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
        }

        //power = scale / distance^2. capped power, min range within which produces a zero output.
        public Gravitate(target: glm.vec2, strength: number, powerCap: number, minRange: number = glm.EPSILON): glm.vec2 {
            let targetVector: glm.vec2 = target.subtract(new glm.vec2(this.x, this.y));
            let length2 = targetVector.sqrMagnitude();

            let result: glm.vec2 = new glm.vec2();
            if (length2 > (minRange * minRange)) {
                let power = strength / (length2);
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
        }


        //steering behaviours that take velocity into account

        //like seek, but takes velocity into account
        public Steer(target: glm.vec2, strength: number, powerCap: number): glm.vec2 {
            let targetVector: glm.vec2 = target.subtract(new glm.vec2(this.x, this.y));
            let length: number = glm.vec2.magnitude(targetVector);

            if (length > 0.0) {
                targetVector.x *= (strength / length);
                targetVector.y *= (strength / length);
                targetVector = targetVector.subtract(this.velocity);

                let result: glm.vec2 = targetVector;
                length = glm.vec2.magnitude(result);

                if (length > powerCap) {
                    powerCap /= length;
                    result.x *= powerCap;
                    result.y *= powerCap;
                    return result;
                }
            }

            return new glm.vec2();
        }

        //move toward target, slow down at the target
        public Arrive(target: glm.vec2, strength: number, radius: number, powerCap: number): glm.vec2 {
            let targetVector: glm.vec2 = target.subtract(new glm.vec2(this.x, this.y));

            //faster than length() < radius
            let length2 = glm.vec2.squaredMagnitude(targetVector);
            let rad2 = radius * radius;

            let result: glm.vec2 = new glm.vec2();

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

            let length = result.magnitude();
            if (length > powerCap) {
                powerCap /= length;
                result.x *= powerCap;
                result.y *= powerCap;
                return result;
            }

            return result;
        }

        public setScale(size:number):void {
            this.shape.scaleX = size;
            this.shape.scaleY = size;
        }

        public getPosition():glm.vec2 {
            return new glm.vec2(this.x, this.y);
        }

    }
}
