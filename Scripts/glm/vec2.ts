/// <reference path="vector.ts"/>

module glm {
  /**
   * The vec2 class which represents a 2D Vector with x and y properties
   *
   * @export
   * @class vec2
   * @extends {Vector}
   */
  export class vec2 extends glm.Vector {
    /**
     * Creates an instance of vec2.
     *
     * @constructor
     * @param {number} [x=0] // defaults value to 0
     * @param {number} [y=0] // defaults value to 0
     * @memberof vec2
     */
    constructor(public x: number = 0, public y: number = 0) {
      super(x, y);
    }

    /***********************************************************************/
    /* GETTERS & SETTERS                                                   */
    /***********************************************************************/
    get xy(): vec2 {
      return new vec2(this.x, this.y);
    }

    set xy(vec: vec2) {
      this.x = vec.x;
      this.y = vec.y;
    }

    /***********************************************************************/
    /* PUBLIC METHODS                                                      */
    /***********************************************************************/

    /**
     * This method resets the vec2 object to zero values
     *
     * @memberof vec2
     */
    public reset(): void {
      this.x = 0;
      this.y = 0;
    }

    /**
     * This method adds a vec2 to a vec2
     * Equivalent to += shortcut operation
     *
     * @param {vec2} vec
     * @returns {vec2}
     * @memberof vec2
     */
    public add(vec: vec2): vec2 {
      this.x += vec.x;
      this.y += vec.y;
      return this;
    }

    /**
     * This method subtracts a vec2 from a vec2
     * Equivalent to -= shortcut operation
     *
     * @param {vec2} vec
     * @returns {vec2}
     * @memberof vec2
     */
    public subtract(vec: vec2): vec2 {
      this.x -= vec.x;
      this.y -= vec.y;
      return this;
    }

    /**
     * This method multiplies a vec2 by another vec2
     * Equivalent to *= shortcut operation
     *
     * @param {vec2} vec
     * @returns {vec2}
     * @memberof vec2
     */
    public multiply(vec: vec2): vec2 {
      this.x *= vec.x;
      this.y *= vec.y;
      return this;
    }

    /**
     * This method divides a vec2 by another vec2
     * Equivalent to /= shortcut operation
     *
     * @param {vec2} vec
     * @returns {vec2}
     * @memberof vec2
     */
    public divide(vec: vec2): vec2 {
      this.x /= vec.x;
      this.y /= vec.y;
      return this;
    }

    /**
     * The method scales this vec2 by the scalar {value} parameter.
     *
     * @param {number} value
     * @memberof vec2
     */
    public scale(value: number):void {
      this.x *= value;
      this.y *= value;
    }

    /**
     * Sets the x and y components of this vec2
     *
     * @param {number} x
     * @param {number} y
     * @memberof vec2
     */
    public set(x:number, y:number):void {
      this.x = x;
      this.y = y;
    }

    /**
     * Returns the magnitude of this vec2
     *
     * @returns {number}
     * @memberof vec2
     */
    public magnitude():number {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    /**
     * Returns the sqrMagnitude of this vec2
     * No Square Root
     * @returns {number}
     * @memberof vec2
     */
    public sqrMagnitude():number {
      return (this.x * this.x) + (this.y * this.y);
    }

    /**
     * This method returns the normalized value of this vec2
     *
     * @returns {vec2}
     * @memberof vec2
     */
    public normalized():vec2 {
      let result:vec2 = new vec2(this.x, this.y);
      result.normalize();
      return result;
    }

    /**
     * This method normalizes the vec2 object
     *
     * @memberof vec2
     */
    public normalize():void {
      let magnitude = this.magnitude();
      if(magnitude > glm.EPSILON) {
        this.x /= magnitude;
        this.y /= magnitude;
      }
      else  {
        this.reset();
      }
    }

     /**
     * This method overrides the built-in toString method to format the values
     * of a vec2 in (x, y) form and outputs this as a string
     *
     * @returns {string}
     * @memberof vec2
     */
    public toString(): string {
      let x = this.x.toFixed(2);
      let y = this.y.toFixed(2);
      return "(" + x + ", " + y + ")";
    }

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
    public static add(vecA:glm.vec2, vecB:glm.vec2, dest?:glm.vec2):glm.vec2 {
        if (!dest) { dest = new vec2(); }
        dest.x = vecA.x + vecB.x;
        dest.y = vecA.y + vecB.y;
        return dest;
    }

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
    public static subtract(vecA:glm.vec2, vecB:glm.vec2, dest?:glm.vec2):glm.vec2 {
        if (!dest) { dest = new vec2(); }
        dest.x = vecB.x - vecA.x;
        dest.y = vecB.y - vecA.y;
        return dest;
    }

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
    public static copy(src: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = src.x;
      dest.y = src.y;
      return dest;
    }

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
    public static ceil(src: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = Math.ceil(src.x);
      dest.y = Math.ceil(src.y);
      return dest;
    }

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
    public static floor(src: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = Math.floor(src.x);
      dest.y = Math.floor(src.y);
      return dest;
    }

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
    public static round(src: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = Math.round(src.x);
      dest.y = Math.round(src.y);
      return dest;
    }

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
    public static min(vecA: vec2, vecB: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = Math.min(vecA.x, vecB.x);
      dest.y = Math.min(vecA.y, vecB.y);
      return dest;
    }

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
    public static max(vecA: vec2, vecB: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = Math.max(vecA.x, vecB.x);
      dest.y = Math.max(vecA.y, vecB.y);
      return dest;
    }

    /**
     * Returns the Euclidian distance of vecA and vecB
     *
     * @static
     * @param {vec2} vecA
     * @param {vec2} vecB
     * @returns {number}
     * @memberof vec2
     */
    public static distance(vecA: vec2, vecB: vec2): number {
      let x = vecB.x - vecA.x;
      let y = vecB.y - vecA.y;
      return Math.sqrt((x * x) + (y * y));
    }

    /**
     * Returns the Squared Euclidian distance of vecA and vecB
     * No Square Root
     * @static
     * @param {vec2} vecA
     * @param {vec2} vecB
     * @returns {number}
     * @memberof vec2
     */
    public static squaredDistance(vecA: vec2, vecB: vec2): number {
      let x = vecB.x - vecA.x;
      let y = vecB.y - vecA.y;
      return (x * x) + (y * y);
    }

    /**
     * Returns the magnitude of a vec2
     *
     * @static
     * @param {vec2} vec
     * @returns {number}
     * @memberof vec2
     */
    public static magnitude(vec: vec2): number {
      let x = vec.x;
      let y = vec.y;
      return Math.sqrt((x * x) + (y * y));
    }

    /**
     * Returns the squared Magnitude of a vec2
     * No Square Root
     *
     * @static
     * @param {vec2} vec
     * @returns {number}
     * @memberof vec2
     */
    public static squaredMagnitude(vec: vec2): number {
      let x = vec.x;
      let y = vec.y;
      return (x * x) + (y * y);
    }

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
    public static negate(src: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = -src.x;
      dest.y = -src.y;
      return dest;
    }

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
    public static inverse(src: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      dest.x = 1.0 / src.x;
      dest.y = 1.0 / src.y;
      return dest;
    }

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
    public static normalize(src: vec2, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      let x = src.x;
      let y = src.y;
      let length = (x * x) + (y * y);
      if (length > 0) {
        length = 1.0 / Math.sqrt(length);
        dest.x = src.x * length;
        dest.y = src.y * length;
      }
      return dest;
    }

    /**
     * Computes the dot product of vecA and vecB and returns a scalar value
     *
     * @static
     * @param {vec2} vecA
     * @param {vec2} vecB
     * @returns {number}
     * @memberof vec2
     */
    public static dot(vecA: vec2, vecB: vec2): number {
      return (vecA.x * vecB.x) + (vecA.y * vecB.y);
    }

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
    public static cross(vecA: vec2, vecB: vec2, dest?: vec3): vec3 {
      if (!dest) { dest = new vec3(); }
      let z = (vecA.x * vecB.y) - (vecA.y * vecB.x);
      dest.x = 0;
      dest.y = 0;
      dest.z = z;
      return dest;
    }

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
    public static lerp(vecA: vec2, vecB: vec2, tValue: number, dest?: vec2): vec2 {
      if (!dest) { dest = new vec2(); }
      tValue = glm.clamp01(tValue);
      dest.x = ((1.0 - tValue) * vecA.x) + (tValue * vecB.x);
      dest.y = ((1.0 - tValue) * vecA.y) + (tValue * vecB.y);
      return dest;
    }

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
    public static lerpUnclamped(vecA:vec2, vecB:vec2, tValue:number, dest?:vec2):vec2 {
      if(!dest) { dest = new vec2();}
      dest.x = ((1.0 - tValue) * vecA.x) + (tValue * vecB.x);
      dest.y = ((1.0 - tValue) * vecA.y) + (tValue * vecB.y);
      return dest;
    }

    public static moveTowards(current:vec2, target:vec2, maxDistanceDelta:number):vec2 {
      let a:vec2 = new vec2();
      a.x = target.x - current.x;
      a.y = target.y - current.y;
      let magnitude = a.magnitude();
      let result:vec2 = new vec2();
      if (magnitude <= maxDistanceDelta || magnitude == 0.0)
			{
				result = target;
			}
			else
			{
        result.x = current.x + a.x / magnitude * maxDistanceDelta;
        result.y = current.y + a.y / magnitude * maxDistanceDelta;
			}
			return result;
    }

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
    public static random(scale:number = 1.0, dest?:vec2):vec2 {
      if(!dest) { dest = new vec2();}
      let result:number = Math.random() * 2.0 * Math.PI;
      dest.x = Math.cos(result) * scale;
      dest.y = Math.sin(result) * scale;
      return dest;
    }

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
    public static exactEquals(vecA:vec2, vecB:vec2):boolean {
      return ((vecA.x === vecB.x) && (vecA.y ===vecB.y));
    }

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
    public static equals(vecA:vec2, vecB:vec2):boolean {
      let x1 = vecA.x;
      let x2 = vecB.x;
      let y1 = vecA.y;
      let y2 = vecB.y;
      return (Math.abs(x1 - x2) <= glm.EPSILON * Math.max(1.0, Math.abs(x1), Math.abs(x2)) &&
              Math.abs(y1 - y2) <= glm.EPSILON * Math.max(1.0, Math.abs(y1), Math.abs(y2)));
    }

    public static reflect(inDirection:vec2, inNormal:vec2, dest?:vec2):vec2 {
      if(!dest) {dest = new vec2();}
      let dot = vec2.dot(inNormal, inDirection);
      dest.x = -2.0 * dot * inNormal.x + inDirection.x;
      dest.y = -2.0 * dot * inNormal.y + inDirection.y;
      return dest;
    }

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
    public static angle(from:vec2, to:vec2):number {
      let fromNorm = from.normalized();
      let toNorm = to.normalized();
      let dot = vec2.dot(fromNorm, toNorm);
      let dotClamp = glm.clamp(dot, -1.0, 1.0);
      let angleRadians = Math.acos(dotClamp);
      return angleRadians * glm.Rad2Deg;
    }


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
    public static angleOfAttack(from:vec2, to:vec2, is360:boolean = false):number {
        let diff = glm.vec2.subtract(from, to);
        let angleRadians = Math.atan2(diff.y, diff.x);
        let angle = angleRadians * -glm.Rad2Deg;
        if(is360 && angle < 0) {
            angle = 360 + angle;
        }
        return angle;
      }

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
    public static signedAngle(from:vec2, to:vec2):number {
      let normalized = from.normalized();
      let normalized2 = to.normalized();
      let num = Math.acos(glm.clamp(vec2.dot(normalized, normalized2), -1.0, 1.0)) * glm.Rad2Deg;
      let num2 = glm.sign(normalized.x * normalized2.y - normalized.y * normalized2.x);
      return num * num2;
    }

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
    public static direction(from:vec2, to:vec2):vec2 {
      let result = new glm.vec2();
      // returns a vec2 that equals (0, 0) if both from and to are the same
      if(glm.vec2.equals(from, to)) {
          return result;
      }
      let angle = glm.vec2.angleOfAttack(from, to);
      result.x = Math.cos(angle * glm.Deg2Rad);
      result.y = Math.sin(angle * glm.Deg2Rad);

      // sanitizes components of result
      result.x = glm.Sanitize(result.x);
      result.y = glm.Sanitize(result.y);
      return result;
    }

    /**
     * Shorthand for writing vec2(0, -1). Stores the new vec2 in dest
     * or creates a new vec2 object
     *
     * @static
     * @param {vec2} [dest]
     * @returns {vec2}
     * @memberof vec2
     */
    public static down(dest?:vec2):vec2 {
      if(!dest) {dest = new vec2();}
      dest.x = 0;
      dest.y = -1;
      return dest;
    }

    /**
     * Shorthand for writing vec2(-1, 0). Stores the new vec2 in dest
     * or creates a new vec2 object
     *
     * @static
     * @param {vec2} [dest]
     * @returns {vec2}
     * @memberof vec2
     */
    public static left(dest?:vec2):vec2 {
      if(!dest) {dest = new vec2();}
      dest.x = -1;
      dest.y = 0;
      return dest;
    }

    /**
     * Shorthand for writing vec2(1, 0). Stores the new vec2 in dest
     * or creates a new vec2 object
     *
     * @static
     * @param {vec2} [dest]
     * @returns {vec2}
     * @memberof vec2
     */
    public static right(dest?:vec2):vec2 {
      if(!dest) {dest = new vec2();}
      dest.x = 1;
      dest.y = 0;
      return dest;
    }

    /**
     * Shorthand for writing vec2(0, 1). Stores the new vec2 in dest
     * or creates a new vec2 object
     *
     * @static
     * @param {vec2} [dest]
     * @returns {vec2}
     * @memberof vec2
     */
    public static up(dest?:vec2):vec2 {
      if(!dest) {dest = new vec2();}
      dest.x = 0;
      dest.y = 1;
      return dest;
    }

    /**
     * Shorthand for writing vec2(0, 0). Stores the new vec2 in dest
     * or creates a new vec2 object
     *
     * @static
     * @param {vec2} [dest]
     * @returns {vec2}
     * @memberof vec2
     */
    public static zero(dest?:vec2):vec2 {
      if(!dest) {dest = new vec2();}
      dest.x = 0;
      dest.y = 0;
      return dest;
    }

    /**
     * Shorthand for writing vec2(1, 1). Stores the new vec2 in dest
     * or creates a new vec2 object
     *
     * @static
     * @param {vec2} [dest]
     * @returns {vec2}
     * @memberof vec2
     */
    public static one(dest?:vec2):vec2 {
      if(!dest) {dest = new vec2();}
      dest.x = 1;
      dest.y = 1;
      return dest;
    }
  }
}
