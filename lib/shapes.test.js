const { Circle, Square, Triangle } = require('./shapes');

describe('Shape rendering', () => {
    test('Circle rendering', () => {
        const circle = new Circle();
        circle.setColor('red');
        const expectedSVG = '<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="red">';
        expect(circle.render()).toBe(expectedSVG);
    });

    test('Triangle rendering', () => {
        const triangle = new Triangle();
        triangle.setColor('blue');
        const expectedSVG = '<polygon height="100%" width="100%" points="250,60 100,400 400,400" fill="blue">';
        expect(triangle.render()).toBe(expectedSVG);
    });

    test('Square rendering', () => {
        const square = new Square();
        square.setColor('green');
        const expectedSVG = '<rect x="50" y="20" width="150" height="150" fill="green">';
        expect(square.render()).toBe(expectedSVG);
    });
});

