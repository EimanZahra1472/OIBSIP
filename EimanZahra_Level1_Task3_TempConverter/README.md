# Temperature Converter

## Description
A fully functional temperature conversion web application that converts between Celsius (°C), Fahrenheit (°F), and Kelvin (K). Features real-time conversion, input validation, swap functionality, and quick reference formulas.

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Custom Properties, Animations)
- JavaScript (ES6+)

## File Structure
Level1_Task3_TempConverter/
├── index.html # HTML structure
├── style.css # All styling
├── script.js # JavaScript logic
└── README.md # Documentation

## Features
- **Three Temperature Scales** - Celsius, Fahrenheit, Kelvin
- **Real-time Conversion** - Updates as you type or change units
- **Input Validation** - Shows error for invalid/non-numeric input
- **Swap Function** - One-click swap between "From" and "To" units
- **Keyboard Support** - Press Enter to convert
- **Conversion Formulas** - Quick reference section with all formulas
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Visual feedback on conversion and swap

## Conversion Formulas Used
| From | To | Formula |
|------|-----|---------|
| Celsius | Fahrenheit | °F = (°C × 9/5) + 32 |
| Fahrenheit | Celsius | °C = (°F − 32) × 5/9 |
| Celsius | Kelvin | K = °C + 273.15 |
| Kelvin | Celsius | °C = K − 273.15 |
| Fahrenheit | Kelvin | K = (°F − 32) × 5/9 + 273.15 |
| Kelvin | Fahrenheit | °F = (K − 273.15) × 9/5 + 32 |

## How to Run
1. Save all three files in the same folder
2. Open `index.html` in any modern web browser
3. No server or dependencies required

## Usage
1. Enter a temperature value in the input field
2. Select the unit you're converting FROM
3. Select the unit you want to convert TO
4. Click "Convert" or press Enter
5. Or simply use the Swap button to reverse units

## Example Conversions
- 0°C = 32°F = 273.15K
- 100°C = 212°F = 373.15K
- 32°F = 0°C = 273.15K
- 0K = -273.15°C = -459.67°F

## JavaScript Functions
- `toCelsius(value, from)` - Converts any unit to Celsius
- `fromCelsius(celsius, to)` - Converts Celsius to target unit
- `convertTemperature()` - Main conversion handler
- `swapUnits()` - Swaps FROM and TO units
- `updateInputBadge()` - Updates the input unit display

## Live Demo
Open locally or deploy to GitHub Pages