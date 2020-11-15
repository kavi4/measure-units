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

        expect(resultCoefficients).toEqual(new CoefficientMap([
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

        expect(resultCoefficients).toEqual(new CoefficientMap([
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

        expect(resultCoefficients).toEqual(new CoefficientMap([
            [Units.DECA, 10],
            [Units.CENTI, 0.01],
            [Units.MILLI, 0.001],
        ]))
    })

    test('map', () => {

        let result = resultCoefficients.map((value, key, map) => {
            return value * 10;
        })

        expect(result).toEqual(new CoefficientMap([
            [Units.KILO, 10000],
            [Units.HECTO, 1000],
            [Units.DECA, 100],
            [Units.SOURCE, 10],
            [Units.DECI, 1],
            [Units.CENTI, 0.1],
            [Units.MILLI, 0.01],
        ]))
    })
})

