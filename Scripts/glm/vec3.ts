module glm {
  export class vec3 extends glm.Vector {
    constructor();
    constructor(vec: glm.vec2, z: number);
    constructor(x: number | glm.vec2 = 0, y: number = 0, z: number = 0) {
      let thisX: number;
      let thisY: number;
      let thisZ: number;
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

      super(thisX, thisY, thisZ);
    }

    // PUBLIC GETTERS AND SETTERS
    get xyz(): glm.Vector {
      return new glm.Vector(this.x, this.y, this.z);
    }

    set xyz(vec:glm.Vector) {
      this.x = vec.x;
      this.y = vec.y;
      this.z = vec.z;
      this.w = 1.0;
    }

    // PUBLIC METHODS

    public toString(): string {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }
  }
}
