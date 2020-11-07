import NativeMath from './math/NativeMath'
import IMath from './math/IMath'
import CoefficientMap from './CoefficientMap'
import IMeasureUnitConverter from './IMeasureUnitConverter'
import MeasureUnitError from './error/MeasureUnitError'
import UnexpectedMeasureUnitError from './error/UnexpectedMeasureUnitError'

/**
 * Class for converting measure units
 */
export default class MeasureUnitConverter extends IMeasureUnitConverter {

    /**
     *  @param options
     *  @example
     *  {
     *      coefficientMap: new CoefficientMap(), //measure unit coefficient map
     *      math: new NativeMath() //class for math operations
     *  }
     */
    constructor(options) {
        super()

        const {coefficientMap = new CoefficientMap(), math = new NativeMath()} = options

        this.map = coefficientMap
        this.math = math

        if (!(this.math instanceof IMath)) {
            throw new MeasureUnitError('Math must be instance of IMath')
        }

        if (!(this.map instanceof CoefficientMap)) {
            throw new MeasureUnitError('CoefficientMap must be instance of CoefficientMap')
        }
    }

    /**
     * @param code
     * @returns {boolean}
     */
    canConvert(code) {
        return this.map.has(code)
    }

    /**
     * Convert value to destination measure unit
     * @param value
     * @param sourceUnit
     * @param destinationUnit
     * @returns {*}
     */
    convert(value, sourceUnit, destinationUnit) {

        if (!this.map.has(sourceUnit) || !this.map.has(destinationUnit)) {
            throw new UnexpectedMeasureUnitError('Measure unit undefined')
        }

        const sourceUnits = this.math.multiplication(value, this.map.get(sourceUnit))
        return this.math.division(sourceUnits, this.map.get(destinationUnit))
    }

    /**
     * Returns shorty record of value
     * @param value
     * @param sourceUnit
     * @returns {object}
     */
    convertToPreferUnit(value, sourceUnit) {

        if (!this.map.has(sourceUnit)) {
            throw new UnexpectedMeasureUnitError('Measure unit undefined')
        }

        const sourceUnits = this.math.abs(this.math.multiplication(value, this.map.get(sourceUnit)))

        let lastUnit = null
        let resultValue = value

        for (let [unit, coefficient] of this.map) {
            resultValue = this.math.division(sourceUnits, coefficient)
            if (this.math.greaterOrEqual(resultValue, 1)) {
                return {unit, value: resultValue}
            }
            lastUnit = unit
        }

        return {unit: lastUnit, value: resultValue};
    }
}
