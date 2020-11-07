'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Interface of class for arithmetic operation in MeasureUnitConverter
 * this class used because javascript not provide normal support of operator overloading
 */
class IMath {
  /**
   * The absolute value of a number
   * @param value
   */
  abs(value) {
    throw new Error('Method not implemented');
  }
  /**
   * Multiplication
   * @param a
   * @param b
   */


  multiplication(a, b) {
    throw new Error('Method not implemented');
  }
  /**
   * Division
   * @param a
   * @param b
   */


  division(a, b) {
    throw new Error('Method not implemented');
  }
  /**
   * Comparison greater than or eq ual
   * @param a
   * @param b
   */


  greaterOrEqual(a, b) {
    throw new Error('Method not implemented');
  }

}

class NativeMath extends IMath {
  /**
   * @param value
   * @returns {number}
   */
  abs(value) {
    return Math.abs(value);
  }
  /**
   * @param a
   * @param b
   * @returns {number}
   */


  multiplication(a, b) {
    return a * b;
  }
  /**
   * @param a
   * @param b
   * @returns {number}
   */


  division(a, b) {
    return a / b;
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

/**
 * This class used for store coefficients
 * all values should be sorted (desc)
 */
class CoefficientMap extends Map {
  /**
   * Save only included keys
   * @param keys
   */
  include(keys) {
    for (let key of this.keys()) {
      if (!keys.includes(key)) {
        this.delete(key);
      }
    }
  }
  /**
   * Exclude keys from map
   * @param keys
   */


  exclude(keys) {
    keys.map(key => {
      if (this.has(key)) {
        this.delete(key);
      }
    });
  }

}

class IMeasureUnitConverter {
  /**
   * @param code
   * @returns {boolean}
   */
  canConvert(code) {
    throw new Error('Method not implemented');
  }
  /**
   * Convert value to destination measure unit
   * @param value
   * @param sourceUnit
   * @param destinationUnit
   * @returns {*}
   */


  convert(value, sourceUnit, destinationUnit) {
    throw new Error('Method not implemented');
  }
  /**
   * Returns shorty record of value
   * @param value
   * @param sourceUnit
   * @returns {object}
   */


  convertToPreferUnit(value, sourceUnit) {
    throw new Error('Method not implemented');
  }

}

class MeasureUnitError extends Error {}

class UnexpectedMeasureUnitError extends MeasureUnitError {}

/**
 * Class for converting measure units
 */

class MeasureUnitConverter extends IMeasureUnitConverter {
  /**
   *  @param options
   *  @example
   *  {
   *      coefficientMap: new CoefficientMap(), //measure unit coefficient map
   *      math: new NativeMath() //class for math operations
   *  }
   */
  constructor(options) {
    super();
    const {
      coefficientMap = new CoefficientMap(),
      math = new NativeMath()
    } = options;
    this.map = coefficientMap;
    this.math = math;

    if (!(this.math instanceof IMath)) {
      throw new MeasureUnitError('Math must be instance of IMath');
    }

    if (!(this.map instanceof CoefficientMap)) {
      throw new MeasureUnitError('CoefficientMap must be instance of CoefficientMap');
    }
  }
  /**
   * @param code
   * @returns {boolean}
   */


  canConvert(code) {
    return this.map.has(code);
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
      throw new UnexpectedMeasureUnitError('Measure unit undefined');
    }

    const sourceUnits = this.math.multiplication(value, this.map.get(sourceUnit));
    return this.math.division(sourceUnits, this.map.get(destinationUnit));
  }
  /**
   * Returns shorty record of value
   * @param value
   * @param sourceUnit
   * @returns {object}
   */


  convertToPreferUnit(value, sourceUnit) {
    if (!this.map.has(sourceUnit)) {
      throw new UnexpectedMeasureUnitError('Measure unit undefined');
    }

    const sourceUnits = this.math.abs(this.math.multiplication(value, this.map.get(sourceUnit)));
    let lastUnit = null;
    let resultValue = value;

    for (let [unit, coefficient] of this.map) {
      resultValue = this.math.division(sourceUnits, coefficient);

      if (this.math.greaterOrEqual(resultValue, 1)) {
        return {
          unit,
          value: resultValue
        };
      }

      lastUnit = unit;
    }

    return {
      unit: lastUnit,
      value: resultValue
    };
  }

}

/**
 * Provides a single point of access to measure unit converters
 */

class MeasureUnitFacade extends IMeasureUnitConverter {
  /**
   * @param converters
   */
  constructor(converters = []) {
    super();
    this.converters = converters;
  }
  /**
   *
   * @param code
   * @returns {boolean}
   */


  canConvert(code) {
    return this.converters.some(converter => {
      return converter.canConvert(code);
    });
  }
  /**
   * @param value
   * @param sourceUnit
   * @param destinationUnit
   * @returns {undefined|*}
   */


  convert(value, sourceUnit, destinationUnit) {
    for (let i = 0; i < this.converters.length; i++) {
      let converter = this.converters[i];

      if (converter.canConvert(sourceUnit) && converter.canConvert(destinationUnit)) {
        return converter.convert(value, sourceUnit, destinationUnit);
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
      let converter = this.converters[i];

      if (converter.canConvert(sourceUnit)) {
        return converter.convertToPreferUnit(value, sourceUnit);
      }
    }

    throw new UnexpectedMeasureUnitError('Measure unit undefined');
  }

}

exports.CoefficientMap = CoefficientMap;
exports.IMath = IMath;
exports.IMeasureUnitConverter = IMeasureUnitConverter;
exports.MeasureUnitConverter = MeasureUnitConverter;
exports.MeasureUnitFacade = MeasureUnitFacade;
exports.NativeMath = NativeMath;
