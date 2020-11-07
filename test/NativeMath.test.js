import NativeMath from '../src/math/NativeMath'

describe('test native math', () => {
    let math = new NativeMath()
    test('operations', () => {
        expect(math.abs(-2)).toEqual(2)
        expect(math.abs(2)).toEqual(2)

        expect(math.multiplication(2, 2)).toEqual(4)

        expect(math.division(2, 2)).toEqual(1)

        expect(math.greaterOrEqual(3, 2)).toEqual(true)
        expect(math.greaterOrEqual(2, 2)).toEqual(true)
    })
})
