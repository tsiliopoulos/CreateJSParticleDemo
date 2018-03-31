/// <reference path = "../objects/color.ts"/>

module glm {
    export const EPSILON: number = 0.000001;
    export const Deg2Rad: number = Math.PI / 180.0;
    export const Rad2Deg: number = 180.0 / Math.PI;


    /**
     * Returns the -1 if the value is less than 0 and 1 if the value is greater than 0
     *
     * @export
     * @param {number} value
     * @returns {number}
     */
    export function sign(value: number): number {
        return (value < 0.0) ? -1.0 : 1.0;
    }

    /**
     * This method confines the value provided between min and max and returns the result
     *
     * @export
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    export function clamp(value: number, min: number, max: number): number {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }

    /**
     * Clamps a value between 0 and 1 and returns the result
     *
     * @export
     * @param {number} value
     * @returns {number}
     */
    export function clamp01(value: number): number {
        let result: number;
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

    export function limitMagnitude(vector: glm.vec2, magnitude: number): glm.vec2 {
        let length: number = glm.vec2.magnitude(vector);

        if (length > magnitude) {
            let limiter = magnitude / length;
            vector.x *= limiter;
            vector.y *= limiter;
            return vector;
        }
        else {
            return vector;
        }
    }

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
    export function lerp(a: number, b: number, t: number): number {
        return a + (b - a) * glm.clamp01(t);
    }

    /**
     * Lerps between a and b at some t value - unclamped.
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    export function lerpUnclamped(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    /**
     * Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @param {number} t
     * @returns {number}
     */
    export function lerpAngle(a: number, b: number, t: number): number {
        let num: number = glm.repeat(b - a, 360.0);
        if (num > 180.0) {
            num -= 360.0;
        }
        return a + num * glm.clamp01(t);
    }

    /**
     * lerps between to color objects at some tValue;
     *
     * @export
     * @param {objects.Color} a
     * @param {objects.Color} b
     * @param {number} t
     * @returns {objects.Color}
     */
    export function lerpColor(a: objects.Color, b: objects.Color, t: number): objects.Color {
        let red = a.r + (b.r - a.r) * glm.clamp01(t);
        let green = a.g + (b.g - a.g) * glm.clamp01(t);
        let blue = a.b + (b.b - a.b) * glm.clamp01(t);
        let alpha = a.a + (b.a - a.a) * glm.clamp01(t);
        return new objects.Color(red, green, blue, alpha);
    }

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
    export function moveTowards(current: number, target: number, maxDelta: number): number {
        let result: number;
        if (Math.abs(target - current) <= maxDelta) {
            result = target;
        }
        else {
            result = current + glm.sign(target - current) * maxDelta;
        }
        return result;
    }

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
    export function moveTowardsAngle(current: number, target: number, maxDelta: number): number {
        let num = glm.deltaAngle(current, target);
        let result: number;
        if (-maxDelta < num && num < maxDelta) {
            result = target;
        }
        else {
            target = current + num;
            result = glm.moveTowards(current, target, maxDelta);
        }
        return result;
    }

    /**
     * Interpolates between min and max with smoothing at the limits.
     *
     * @export
     * @param {number} from
     * @param {number} to
     * @param {number} t
     * @returns {number}
     */
    export function smoothStep(from: number, to: number, t: number): number {
        t = glm.clamp01(t);
        t = -2.0 * t * t * t + 3.0 * t * t;
        return to * t + from * (1.0 - t);
    }

    export function gamma(value: number, absmax: number, gamma: number): number {
        let flag: boolean = false;
        if (value < 0.0) {
            flag = true;
        }
        let num = Math.abs(value);
        let result: number
        if (num > absmax) {
            result = ((!flag) ? num : (-num));
        }
        else {
            let num2 = Math.pow(num / absmax, gamma) * absmax;
            result = ((!flag) ? num2 : (-num2));
        }
        return result;
    }

    /**
     * Compares two floating point values and returns true if they are similar.
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @returns {boolean}
     */
    export function approximately(a: number, b: number): boolean {
        return Math.abs(b - a) < Math.max(1E-06 * Math.max(Math.abs(a), Math.abs(b)), glm.EPSILON * 8.0);
    }

    /**
     * Loops the value t, so that it is never larger than length and never smaller than 0.
     *
     * @export
     * @param {number} t
     * @param {number} length
     * @returns {number}
     */
    export function repeat(t: number, length: number): number {
        return glm.clamp(t - Math.floor(t / length) * length, 0.0, length);
    }

    /**
     * PingPongs the value t, so that it is never larger than length and never smaller than 0.
     *
     * @export
     * @param {number} t
     * @param {number} length
     * @returns {number}
     */
    export function pingpong(t: number, length: number): number {
        t = glm.repeat(t, length * 2.0);
        return length - Math.abs(t - length);
    }

    /**
     * Calculates the linear parameter t that produces the interpolant value within the range [a, b].
     *
     * @export
     * @param {number} a
     * @param {number} b
     * @param {number} value
     * @returns {number}
     */
    export function inverseLerp(a: number, b: number, value: number): number {
        let result: number;
        if (a != b) {
            result = glm.clamp01((value - a) / (b - a));
        }
        else {
            result = 0.0;
        }
        return result;
    }

    /**
     * Calculates the shortest difference between two given angles given in degrees.
     *
     * @export
     * @param {number} current
     * @param {number} target
     * @returns {number}
     */
    export function deltaAngle(current: number, target: number): number {
        let num = glm.repeat(target - current, 360.0);
        if (num > 180.0) {
            num -= 360.0;
        }
        return num;
    }

    export function lineIntersection(p1: vec2, p2: vec2, p3: vec2, p4: vec2, result?: vec2): boolean {
        if (!result) { result = new vec2(); }
        let num = p2.x - p1.x;
        let num2 = p2.y - p1.y;
        let num3 = p4.x - p3.x;
        let num4 = p4.y - p3.y;
        let num5 = num * num4 - num2 * num3;
        let result2: boolean;
        if (num5 == 0.0) {
            result2 = false;
        }
        else {
            let num6 = p3.x - p1.x;
            let num7 = p3.y - p1.y;
            let num8 = (num6 * num4 - num7 * num3) / num5;
            result = new vec2(p1.x + num8 * num, p1.y + num8 * num2);
            result2 = true;
        }
        return result2;
    }

    export function RandomRange(min: number, max: number) {
        return Math.random() * (max - min + 1) + min;
    }

    /**
     * This Utility function checks to see if a number is very small (close to EPSILON)
     * If so, it changes the value to 0.0;
     *
     * @export
     * @param {number} value
     * @returns {number}
     */
    export function Sanitize(value: number): number {
        if ((value >= -glm.EPSILON) && (value <= glm.EPSILON)) {
            value = 0.0;
        }
        return value;
    }

}
