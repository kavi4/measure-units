export default class IMeasureUnitConverter {

    /**
     * @param code
     * @returns {boolean}
     */
    canConvert(code) {
        throw new Error('Method not implemented')
    }

    /**
     * Convert value to destination measure unit
     * @param value
     * @param sourceUnit
     * @param destinationUnit
     * @returns {*}
     */
    convert(value, sourceUnit, destinationUnit) {
        throw new Error('Method not implemented')
    }

    /**
     * Returns shorty record of value
     * @param value
     * @param sourceUnit
     * @returns {object}
     */
    convertToPreferUnit(value, sourceUnit) {
        throw new Error('Method not implemented')
    }
}
