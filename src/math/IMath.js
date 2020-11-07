/**
 * Interface of class for arithmetic operation in MeasureUnitConverter
 * this class used because javascript not provide normal support of operator overloading
 */
export default class IMath {
    /**
     * The absolute value of a number
     * @param value
     */
    abs(value) {
        throw new Error('Method not implemented')
    }

    /**
     * Multiplication
     * @param a
     * @param b
     */
    multiplication(a, b) {
        throw new Error('Method not implemented')
    }

    /**
     * Division
     * @param a
     * @param b
     */
    division(a, b) {
        throw new Error('Method not implemented')
    }

    /**
     * Comparison greater than or eq ual
     * @param a
     * @param b
     */
    greaterOrEqual(a, b) {
        throw new Error('Method not implemented')
    }
}
