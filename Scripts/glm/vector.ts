module glm {
  export class Vector extends glm.Point {
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
      super(x, y, z, w);
    }

    get rgb():Vector {
      return new Vector(this.x, this.y, this.z);
    }

    set rgb(vec:Vector) {
      this.x = vec.x;
      this.y= vec.y;
      this.z = vec.z;
      this.w = 1.0;
    }
  }
}
