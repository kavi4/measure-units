import MeasureUnitConverter from '../src/MeasureUnitConverter'
import CoefficientMap from '../src/CoefficientMap'
import MeasureUnitFacade from '../src/MeasureUnitFacade'

describe('test measure unit converter', () => {
    const Unit = new MeasureUnitFacade([
        new MeasureUnitConverter({
            coefficientMap: new CoefficientMap([['m', 100], ['sm', 1]]),
        }),
        new MeasureUnitConverter({
            coefficientMap: new CoefficientMap([['kg', 1000], ['g', 1]]),
        })
    ])

    test('canConvert', () => {
        expect(Unit.canConvert('eerge')).toEqual(false)
    })

    test('convert', () => {
        expect(Unit.convert(500, 'sm', 'm')).toEqual(5)
        expect(Unit.convert(450, 'g', 'kg')).toEqual(0.45)
    })

    test('convertToPreferUnit', () => {
        expect(Unit.convertToPreferUnit(1000, 'g')).toEqual({value: 1, unit: 'kg'})
        expect(Unit.convertToPreferUnit(100, 'sm')).toEqual({value: 1, unit: 'm'})
    })

    test('using unexpected units', () => {
        const error = new Error('Measure unit undefined')

        //unexpected destination unit
        expect(() => {
            Unit.convert(0.001, 'gr', 124123123324)
        }).toThrowError(error)

        //unexpected source unit
        expect(() => {
            Unit.convert(0.001, 12335344213, 'gr')
        }).toThrowError(error)

        //prefer unit
        expect(() => {
            Unit.convertToPreferUnit(0.001, 'srerg')
        }).toThrowError(error)
    })
})
