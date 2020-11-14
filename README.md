# measure-units

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eff1c8c68d8d42f8982f1c76b4678233)](https://app.codacy.com/gh/kavi4/measure-units?utm_source=github.com&utm_medium=referral&utm_content=kavi4/measure-units&utm_campaign=Badge_Grade_Settings)

Solution for converting you measure units

## Features
- no dependencies
- can support different numeric libraries (bignumber.js and so on)
- convert measure units
- can convert to prefer unit (smallest unit with a value greater than 1)

## Install

``` npm i @kavi4/measure-units ```

## Usage

For each measure unit group we should define dictionary of codes, then define coefficient map and create converter

### Dictionary with measure unit codes

Its can be just object with constants:

```js
// units.js
export default {
    GRAM: 'g',
    KILOGRAM: 'kg',
    TON: 'ton',
}
```

### Coefficient map 

Coefficient map define measure units relation.
All coefficients should be sorted (desc). 
Set base unit (`Units.GRAM`) and write coefficients relatively base unit:

```js
//coefficients.js
import {CoefficientMap} from 'masure-units'
import Units from './units'

export default new CoefficientMap([
    [Units.TON, 1000000],
    [Units.KILOGRAM, 1000],
    [Units.GRAM, 1],
])
```

If you are using third party coefficient map you can include only units than you are using with help `include` and `exclude` methods:
```js
import {Units, MassCoefficientMap} from 'some-package'

const map = new MassCoefficientMap()

map.include([
    Units.KILOGRAM,
    Units.GRAM,
    Units.MILLIGRAM
])

map.exclude([
      Units.GRAM,
])

// result map contains  Units.KILOGRAM and Units.MILLIGRAM

```

### Create math instance

We use math class because javascript have't normal support operator overloading.

Math used for arithmetic operations in measure unit converters.
From box you have `NativeMath`:

```js
 import {NativeMath} from 'measure-units'
 
 let math = new NativeMath()
 ```
 
You can implement self math class with `IMath`, for example:
 
 ```js
 // bigNumberMath.js
import {IMath} from 'measure-units'
 
class BigNumberMath extends IMath {
    abs(value) {
        return value.abs()
    }

    multiplication(a, b) {
        return a.multipliedBy(b)
    }

    division(a, b) {
        return a.dividedBy(b)
    }

    greaterOrEqual(a, b) {
        return a.gte(b)
    }
}
 ```

### Create MeasureUnitConverter

MeasureUnitConverter used for converting units from group

```js
import {MeasureUnitConverter} from 'measure-units'
import coefficients from './coefficients'
import BigNumberMath from './bigNumberMath'

const massConverter = new MeasureUnitConverter({
    coefficientMap:coefficients,
    math: new BigNumberMath(),
})
```

Then we can join all our converters in one facade. MeasureUnitFacade implements `IMeasureUnitConverter` and we can use facade as converter
```js
import {MeasureUnitFacade} from 'measure-units'
import Units from './units'

const Unit = new MeasureUnitFacade([
    massConverter,
    volumeConverter,
    lengthConverter,
])

Unit.convert(5, Units.GRAM, Units.KILOGRAM)
// 0.005

Unit.convertToPreferUnit(5000, Units.GRAM)
// {value: 5, unit: 'kg'}
```

If we store measure unit values in objects we can write adapter.
For example :
```js

class ConverterAdapter {
    
    constructor(converter){
        this.converter = converter
    }
    /**
    * @param Unit unit // {value:1, code:'kg'}
    * @param destinationUnit
    */
    convert(unit,destinationUnit){
        let result = new Unit()
        result.value = this.converter.convert(unit.value, unit.code, destinationUnit)
        result.code = destinationUnit
        
        return result
    }
}
```
