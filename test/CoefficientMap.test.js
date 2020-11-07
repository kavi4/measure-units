import coefficients from './fixture/coefficients'
import Units from './fixture/units'
import CoefficientMap from '../src/CoefficientMap'

describe('test measure unit converter', () => {

    let resultCoefficients;

    beforeEach(() => {
        resultCoefficients = new CoefficientMap(coefficients);
    })

    test('include', () => {
        resultCoefficients.include([Units.KILO, Units.HECTO])

        expect(new Map(resultCoefficients)).toEqual(new Map([
            [Units.KILO, 1000],
            [Units.HECTO, 100],
        ]))
    })

    test('exclude', () => {
        resultCoefficients.exclude([
            Units.KILO,
            Units.HECTO,
            Units.DECA,
            Units.SOURCE,
        ])

        expect(new Map(resultCoefficients)).toEqual(new Map([
            [Units.DECI, 0.1],
            [Units.CENTI, 0.01],
            [Units.MILLI, 0.001],
        ]))
    })

    test('include and exclude', () => {
        resultCoefficients.include([
            Units.KILO,
            Units.HECTO,
            Units.DECA,
            Units.CENTI,
            Units.MILLI,
        ])

        resultCoefficients.exclude([
            Units.KILO,
            Units.HECTO,
        ])

        expect(new Map(resultCoefficients)).toEqual(new Map([
            [Units.DECA, 10],
            [Units.CENTI, 0.01],
            [Units.MILLI, 0.001],
        ]))
    })
})

