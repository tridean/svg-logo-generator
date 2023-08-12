const fs = require('graceful-fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");
const path = require('path');

class Svg {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }
    render() {
        return `<svg width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter 3 characters you want to use in the image.",
    },
    {
        type: "input",
        name: "textColor",
        message: "Enter a color keyword for the image's text. You can also use a hexadecimal number.",
    },
    {
        type: "input",
        name: "shape",
        message: "Enter a color keyword for the image's shape. You can also use a hexadecimal number.",
    },
    {
        type: "list",
        name: "finalImage",
        message: "Choose which shape to use.",
        choices: ["Circle", "Square", "Triangle"],
    },
];

function writeToFile(fileName, data) {
    const filePath = path.join('examples', fileName);
    fs.writeFile(filePath, data, function (err) {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });
}

async function init() {
    const svgFile = 'example-logo.svg';

    const answers = await inquirer.prompt(questions);

    const userText = answers.text;
    const userFontColor = answers.textColor;
    const userShapeColor = answers.shape;
    const userShapeType = answers.finalImage;

    let userShape;
    if (userShapeType === 'Square' || userShapeType === 'square') {
        userShape = new Square();
    } else if (userShapeType === 'Circle' || userShapeType === 'circle') {
        userShape = new Circle();
    } else if (userShapeType === 'Triangle' || userShapeType === 'triangle') {
        userShape = new Triangle();
    } else {
        return;
    }
    userShape.setColor(userShapeColor);

    const svg = new Svg();
    svg.setTextElement(userText, userFontColor);
    svg.setShapeElement(userShape);
    const svgString = svg.render();

    console.log('Displaying shape:\n\n' + svgString);

    console.log('Logo has been generated.');
    console.log('Exporting to examples folder.');
    writeToFile(svgFile, svgString);
}

init();
