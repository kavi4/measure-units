import IMath from './IMath'

export default class NativeMath extends IMath {

    /**
     * @param value
     * @returns {number}
     */
    abs(value) {
        return Math.abs(value)
    }

    /**
     * @param a
     * @param b
     * @returns {number}
     */
    multiplication(a, b) {
        return a * b
    }

    /**
     * @param a
     * @param b
     * @returns {number}
     */
    division(a, b) {
        return a / b
    }

    /**
     * @param a
     * @param b
     * @returns {boolean}
     */
    greaterOrEqual(a, b) {
        return a >= b;
    }
}
