/**
 * This class used for store coefficients
 * all values should be sorted (desc)
 */
export default class CoefficientMap extends Map {

    /**
     * Save only included keys
     * @param keys
     */
    include(keys) {
        for (let key of this.keys()) {
            if (!keys.includes(key)) {
                this.delete(key)
            }
        }
    }

    /**
     * Exclude keys from map
     * @param keys
     */
    exclude(keys) {
        keys.map((key) => {
            if (this.has(key)) {
                this.delete(key)
            }
        })
    }

    /**
     * Map implementation
     * @param func
     * @returns {*}
     */
    map(func) {
        let result = new this.constructor()

        for (let key of this.keys()) {
            result.set(key, func(this.get(key), key, this))
        }

        return result
    }
}
