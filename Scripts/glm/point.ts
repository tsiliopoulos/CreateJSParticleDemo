module glm {
  export abstract class Point {
    constructor(
      public x: number = 0,
      public y: number = 0,
      public z: number = 0,
      public w: number = 0) {
    }
  }
}
