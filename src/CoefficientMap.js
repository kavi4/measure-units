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
}
