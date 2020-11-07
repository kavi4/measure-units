import MeasureUnitConverter from '../src/MeasureUnitConverter'
import coefficients from './fixture/coefficients'
import Units from './fixture/units'
import MeasureUnitError from '../src/error/MeasureUnitError'

describe('test measure unit converter', () => {
    const converter = new MeasureUnitConverter({
        coefficientMap: coefficients,
    })

    test('convert', () => {
        expect(converter.convert(5000, Units.KILO, Units.SOURCE)).toEqual(5000000)
        expect(converter.convert(45.5, Units.DECI, Units.KILO)).toEqual(0.00455)
        expect(converter.convert(0.000001, Units.SOURCE, Units.MILLI)).toEqual(0.001)
    })

    test('convertToPreferUnit', () => {
        //biggest unit have't prefer unit
        expect(converter.convertToPreferUnit(5000, Units.KILO)).toEqual({value: 5000, unit: Units.KILO})

        //prefer big unit
        expect(converter.convertToPreferUnit(10, Units.SOURCE)).toEqual({value: 1, unit: Units.DECA})
        expect(converter.convertToPreferUnit(100, Units.SOURCE)).toEqual({value: 1, unit: Units.HECTO})
        expect(converter.convertToPreferUnit(1000000, Units.MILLI)).toEqual({value: 1, unit: Units.KILO})

        //prefer small unit
        expect(converter.convertToPreferUnit(0.1, Units.KILO)).toEqual({value: 1, unit: Units.HECTO})
        expect(converter.convertToPreferUnit(0.001, Units.KILO)).toEqual({value: 1, unit: Units.SOURCE})
        expect(converter.convertToPreferUnit(0.000001, Units.SOURCE)).toEqual({value: 0.001, unit: Units.MILLI})

        //smallest unit have't prefer unit
        expect(converter.convertToPreferUnit(0.01, Units.MILLI)).toEqual({value: 0.01, unit: Units.MILLI})
    })

    test('using unexpected units', () => {
        const exceptionConverter = new MeasureUnitConverter({
            coefficientMap: coefficients
        })

        const error = new Error('Measure unit undefined')

        //unexpected destination unit
        expect(() => {
            exceptionConverter.convert(0.001, Units.SOURCE, 124123123324)
        }).toThrowError(error)

        //unexpected source unit
        expect(() => {
            exceptionConverter.convert(0.001, 'ergw', 12335344213)
        }).toThrowError(error)

        //prefer unit
        expect(() => {
            exceptionConverter.convertToPreferUnit(0.001, 'srerg')
        }).toThrowError(error)
    })

    test('invalid creation', () => {

        //invalid coefficientMap
        expect(() => {
            new MeasureUnitConverter({coefficientMap: {}})
        }).toThrowError(new MeasureUnitError('CoefficientMap must be instance of CoefficientMap'))

        //invalid math
        expect(() => {
            new MeasureUnitConverter({math: {}})
        }).toThrowError(new MeasureUnitError('Math must be instance of IMath'))
    })
})
