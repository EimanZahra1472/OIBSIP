# Modern Calculator

## Description
A fully functional calculator web application with basic arithmetic operations. Features a clean, modern interface with keyboard support and responsive design.

## Technologies Used
- HTML5
- CSS3 (Grid Layout, Flexbox, CSS Variables)
- JavaScript ES6+ (Object-Oriented Programming)

## File Structure
Level2_Task1_Calculator/
├── index.html # HTML structure
├── style.css # All styling
├── script.js # JavaScript logic (OOP)
└── README.md # Documentation

## Features
- **Basic Operations** - Addition, Subtraction, Multiplication, Division
- **Clear Function** - AC button clears all
- **Delete Function** - ⌫ button deletes last digit
- **Percentage** - % button converts to percentage
- **Decimal Support** - Handles decimal numbers
- **Keyboard Support** - Full keyboard control
- **Division by Zero** - Error handling
- **Responsive Design** - Works on all screen sizes
- **Smooth Animations** - Button press effects

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| 0-9 | Enter numbers |
| . | Decimal point |
| + | Addition |
| - | Subtraction |
| * | Multiplication |
| / | Division |
| Enter or = | Calculate result |
| Escape (ESC) | Clear all |
| Backspace | Delete last digit |
| % | Percentage |

## How to Run
1. Save all three files in the same folder
2. Open `index.html` in any modern web browser
3. No server or dependencies required

## Usage
1. Click number buttons or use keyboard to enter numbers
2. Click an operator (+, -, ×, ÷)
3. Enter the second number
4. Click = or press Enter to see the result
5. Use AC to clear or ⌫ to delete last digit

## Example Calculations
- `12 + 7 = 19`
- `15 - 8 = 7`
- `6 × 4 = 24`
- `20 ÷ 5 = 4`
- `100 × 25% = 25`

## JavaScript Class Structure
```javascript
class Calculator {
    clear()          // Reset calculator
    delete()         // Remove last digit
    appendNumber()   // Add number or decimal
    percent()        // Convert to percentage
    chooseOperation()// Select operation
    compute()        // Perform calculation
    updateDisplay()  // Update screen
}
Browser Support
Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)
Mobile browsers

Live Demo
Open locally or deploy to GitHub Pages