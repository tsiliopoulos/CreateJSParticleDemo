module objects {
    export class ParticleEmitter extends createjs.Container {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++
        private _particles: objects.Particle[];
        private _numberOfParticles: number;
        private _emissionTime: number = 0;
        private _timeRemaining: number = 0;

        // PUBLIC INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++
        public rotationalVelocity: number;
        public emitterOffset: glm.vec2;
        public emissionShape = config.Emitter.ARC;
        public emissionRate: number = 10.0;

        // Emitter Shapes
        public rectangleSize: glm.vec2; // size of the emitter rectangle
        public circleRadius: number = 10.0;

        public arcTopLeft: glm.vec2;
        public arcTopRight: glm.vec2;
        public arcRadius: number = 200.0; // how far from emitter origin
        public arcAngle: number = 30.0; // the width of the arc
        public arcDirection: number = 90.0 // initial direction of arc

        // Emitter Playback
        public playing: boolean = true;
        public loop: boolean = true;

        public loopDelay: number = 0.0;
        public duration: number = -1.0; //negative duration means infinites

        // Particle Path Following
        public followPath: boolean = false;
        public directFollowMode: boolean = false;
        public lookAhead: number = 10.0; // how far ahead particles will seek
        public pathRadius: number = 10.0;
        public pathPower: number = 10.0; //treated like speed in direct mode, like force otherwise

        // Particlee Steering
        public seekingBehaviours: boolean = false;
        public steeringBehaviours: boolean = false;
        public seekPoint: glm.vec2;
        public steerPoint: glm.vec2;
        public gravitatePoint: glm.vec2;
        public attractPoint: glm.vec2;
        public arrivePoint: glm.vec2;
        public seekForce: number = 0.0;
        public steerForce: number = 0.0;
        public steerMaxForce: number = 0.0;
        public gravitatePower: number = 0.0;
        public gravitateMaxForce: number = 0.0;
        public attractForce: number = 0.0;
        public attractRange: number = 0.0;
        public arriveForce: number = 0.0;
        public arriveRange: number = 0.0;
        public arriveMaxForce: number = 0.0;
        public globalEffects: boolean = false;
        public globalForceVector: glm.vec2 = new glm.vec2();
        public globalAccelerationVector: glm.vec2 = new glm.vec2(0.0, -10.0);

        // Particle default settings
        public limitSpeedOverLifetime: boolean = false;
        public initialSpeedLimitRange: glm.vec2 = new glm.vec2();
        public finalSpeedLimitRange: glm.vec2 = new glm.vec2();

        public initialSpeedRange: glm.vec2;

        public lifeRange: glm.vec2;

        public sizeOverLifetime: boolean = false;
        public sizeRangeBegin: glm.vec2;
        public sizeRangeEnd: glm.vec2;
        public massRange: glm.vec2;

        public spinOverLifetime: boolean = false;
        public spinBegin: number;
        public spinEnd: number;

        public colourOverLifetime: boolean = false;
        public colourBegin0: objects.Color;
        public colourBegin1: objects.Color;

        public colourEnd0: objects.Color;
        public colourEnd1: objects.Color;

        public particleType: string = "circle";

        public position: glm.vec2 = new glm.vec2();



        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super();

            this.initialize(1);
        }

        // PRIVATE METHODs
        private _emitFromRectangle(particle: objects.Particle): void {
            let pos: glm.vec2 = new glm.vec2();
            pos.x = glm.RandomRange(this.rectangleSize.x * -0.5, this.rectangleSize.x * 0.5);
            pos.y = glm.RandomRange(this.rectangleSize.y * -0.5, this.rectangleSize.y * 0.5);

            particle.x = pos.x;
            particle.y = pos.y;

            particle.velocity = new glm.vec2(0.0, -2.0); // up direction
        }

        private _emitFromCircle(particle: objects.Particle): void {
            particle.x = 0;
            particle.y = 0;

            let randomAngle = glm.RandomRange(0.0, 360) * glm.Deg2Rad;
            let randomSpeed = glm.RandomRange(1.0, 2.0);
            let direction: glm.vec2 = new glm.vec2();
            direction.x = randomSpeed * Math.cos(randomAngle);
            direction.y = randomSpeed * Math.sin(randomAngle);

            particle.velocity = direction;
        }

        private _emitFromArc(particle: objects.Particle): void {
            particle.x = 0;
            particle.y = 0;

            //this.arcTopRight = new glm.vec2(this.arcRadius * Math.cos(this.arcAngle * glm.Deg2Rad),
            //                                -this.arcRadius * Math.sin(this.arcAngle * glm.Deg2Rad));

            //this.arcTopLeft = new glm.vec2(-this.arcRadius * Math.cos(this.arcAngle * glm.Deg2Rad),
            //                                -this.arcRadius * Math.sin(this.arcAngle * glm.Deg2Rad));

            let halfArcAngle = this.arcAngle * 1.0;
            let randomAngle = glm.RandomRange(80,
                110);
            let randomSpeed = glm.RandomRange(1.0, 2.0);

            let direction = glm.vec2.direction(glm.vec2.zero(), new glm.vec2() )

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
        }

        public buildEmitter(numParticles: number): void {
            if (numParticles > 0) {
                this._particles = new Array<objects.Particle>();
                this._numberOfParticles = numParticles;
            }
            for (let index = 0; index < this._numberOfParticles; index++) {
                this._particles.push(new objects.Particle(this.particleType));
            }
        }

        // PUBLIC METHODS
        public initialize(numParticles: number): void {
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

        }

        public killParticles(): void {
            this._particles.forEach(particle => {
                particle.life = -1;
            });
        }

        public freeMemory(): void {
            if (this._particles) {
                this.removeAllChildren();

                delete this._particles;
                this._particles = null;
                this._numberOfParticles = 0;
            }
        }

        public Update(): void {
            let dt: number = 0.1667;
            this.rotation += this.rotationalVelocity;

            if (this._particles && this.playing) // make sure memory is initialized and system is playing
            {
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

                let NumParticlesToEmit: number = this._emissionTime * this.emissionRate;

                // loop through each particle
                this._particles.forEach(particle => {
                    if ((particle.life <= 0.0) && (NumParticlesToEmit > 0)) {
                        this.spawnParticle(particle);
                        NumParticlesToEmit--;
                        this._emissionTime -= (1.0 / this.emissionRate);
                        this.UpdateParticle(particle, dt);
                    }
                    else {
                        if (particle) {
                            this.UpdateParticle(particle, dt);
                        }
                    }
                });

            }
        }

        public UpdateParticle(particle: objects.Particle, dt: number): void {
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
            let normalizedLife: number = glm.clamp(1.0 - (particle.life / particle.lifespan), 0.0, 1.0);
            if (this.sizeOverLifetime) {
                let size = glm.lerp(particle.sizeBegin, particle.sizeEnd, normalizedLife);
                particle.size = size;
            }

            if (this.colourOverLifetime) {

                if (!particle.colourBegin) {
                    particle.colourBegin = this.colourBegin0;
                    particle.colourEnd = this.colourEnd0;
                }
                let color = glm.lerpColor(particle.colourBegin, particle.colourEnd, normalizedLife);
                particle.color = color;
            }

            if (this.limitSpeedOverLifetime) {
                let speed = glm.lerp(particle.speedLimitBegin, particle.speedLimitEnd, normalizedLife);
                particle.velocity = glm.limitMagnitude(particle.velocity, speed);
            }

            if (this.spinOverLifetime) {
                let rotation = glm.lerp(this.spinBegin, this.spinEnd, normalizedLife);
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
        }

        public spawnParticle(particle: objects.Particle): void {
            particle.colourBegin = glm.lerpColor(this.colourBegin0, this.colourBegin1, Math.random());
            particle.colourEnd = glm.lerpColor(this.colourEnd0, this.colourEnd1, Math.random());

            particle.lifespan = glm.lerp(this.lifeRange.x, this.lifeRange.y, Math.random());
            particle.life = particle.lifespan;

            let randomTval_A = Math.random();
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

            let startspeed = glm.RandomRange(this.initialSpeedRange.x, this.initialSpeedRange.y);
            particle.velocity.x *= startspeed;
            particle.velocity.y *= startspeed;
            // particle.transform.move(this.emitterOffset);


            particle.speedLimitBegin = glm.RandomRange(this.initialSpeedLimitRange.x, this.initialSpeedLimitRange.y);
            particle.speedLimitEnd = glm.RandomRange(this.finalSpeedLimitRange.x, this.finalSpeedLimitRange.y);

            particle.distanceTravelledAlongPath = 0.0;

            particle.size = particle.sizeBegin;
            particle.color = glm.lerpColor(particle.colourBegin, particle.colourEnd, 0.5);

            this.addChildAt(particle.shape, 0);
        }

        public getNumberOfParticles(): number {
            return this._numberOfParticles;
        }

        public getParticle(index): objects.Particle {
            if (index >= this._numberOfParticles) {
                console.log("ParticleEmitter::getParticlePosition ERROR: idx " + index + " out of range!");
                return null;
            }
            return this._particles[index];
        }

        public getParticlePosition(index): glm.vec2 {
            if (index >= this._numberOfParticles) {
                console.log("ParticleEmitter::getParticlePosition ERROR: idx " + index + " out of range!");
                return null;
            }
            return this._particles[index].getPosition();
        }

        public setNumberOfParticles(numParticles: number): void {
            this.freeMemory();
            this.buildEmitter(numParticles);
        }

        public setLifeRange(min: number, max: number): void {
            this.lifeRange = new glm.vec2(min, max);
        }

        public setSizeRangeBegin(min: number, max: number): void {
            this.sizeRangeBegin = new glm.vec2(min, max);
        }

        public setSizeRangeEnd(min: number, max: number): void {
            this.sizeRangeEnd = new glm.vec2(min, max);
        }

        public setParticleType(type: string): void {
            this.particleType = type;
            let numParticles = this._numberOfParticles;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
        }

        public setCircleRadius(radius: number): void {
            let numParticles = this._numberOfParticles;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.circleRadius = radius;
        }

        public setPosition(position: glm.vec2): void {
            this.position = position;
            this.x = position.x;
            this.y = position.y;
        }

        public setEmitterShape(type: number): void {
            let numParticles = this._numberOfParticles;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.emissionShape = type;
        }

        public setRectangleWidth(width: number): void {
            let numParticles = this._numberOfParticles;
            let height = this.rectangleSize.y;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.rectangleSize.x = width;
            this.rectangleSize.y = height;
        }

        public setRectangleHeight(height: number): void {
            let numParticles = this._numberOfParticles;
            let width = this.rectangleSize.x;
            this.initialize(numParticles);
            this._numberOfParticles = numParticles;
            this.rectangleSize.x = width;
            this.rectangleSize.y = height;
        }

    }
}
