import IMeasureUnitConverter from './IMeasureUnitConverter'
import UnexpectedMeasureUnitError from'./error/UnexpectedMeasureUnitError'

/**
 * Provides a single point of access to measure unit converters
 */
export default class MeasureUnitFacade extends IMeasureUnitConverter {

    /**
     * @param converters
     */
    constructor(converters = []) {
        super()
        this.converters = converters
    }

    /**
     *
     * @param code
     * @returns {boolean}
     */
    canConvert(code) {
        return this.converters.some((converter) => {
            return converter.canConvert(code);
        })
    }

    /**
     * @param value
     * @param sourceUnit
     * @param destinationUnit
     * @returns {undefined|*}
     */
    convert(value, sourceUnit, destinationUnit) {
        for (let i = 0; i < this.converters.length; i++) {
            let converter = this.converters[i]
            if (converter.canConvert(sourceUnit) && converter.canConvert(destinationUnit)) {
                return converter.convert(value, sourceUnit, destinationUnit)
            }
        }
        throw new UnexpectedMeasureUnitError('Measure unit undefined');
    }

    /**
     * @param value
     * @param sourceUnit
     * @returns {undefined|void|{unit, value}}
     */
    convertToPreferUnit(value, sourceUnit) {
        for (let i = 0; i < this.converters.length; i++) {
            let converter = this.converters[i]
            if (converter.canConvert(sourceUnit)) {
                return converter.convertToPreferUnit(value, sourceUnit)
            }
        }
        throw new UnexpectedMeasureUnitError('Measure unit undefined');
    }
}
