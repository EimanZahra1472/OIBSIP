class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    percent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = (current / 100).toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        // Format current operand
        let currentDisplay = this.currentOperand;
        if (currentDisplay.includes('.')) {
            const parts = currentDisplay.split('.');
            if (parts[1].length > 8) {
                currentDisplay = parseFloat(currentDisplay).toFixed(8);
            }
        }
        
        this.currentOperandElement.innerText = currentDisplay;
        
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.previousOperand} ${this.getOperationSymbol(this.operation)}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }

    getOperationSymbol(operation) {
        const symbols = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷'
        };
        return symbols[operation] || operation;
    }
}

// Initialize Calculator
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event Listeners for Numbers
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        calculator.appendNumber(number);
        calculator.updateDisplay();
    });
});

// Event Listeners for Operators
document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.getAttribute('data-operator');
        calculator.chooseOperation(operator);
        calculator.updateDisplay();
    });
});

// Event Listeners for Actions
document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

document.querySelector('[data-action="percent"]').addEventListener('click', () => {
    calculator.percent();
    calculator.updateDisplay();
});

document.querySelector('[data-action="equals"]').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// Keyboard Support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers
    if (/[0-9]/.test(key)) {
        event.preventDefault();
        calculator.appendNumber(key);
        calculator.updateDisplay();
    }
    
    // Decimal point
    if (key === '.') {
        event.preventDefault();
        calculator.appendNumber('.');
        calculator.updateDisplay();
    }
    
    // Operators
    if (key === '+') {
        event.preventDefault();
        calculator.chooseOperation('+');
        calculator.updateDisplay();
    }
    if (key === '-') {
        event.preventDefault();
        calculator.chooseOperation('-');
        calculator.updateDisplay();
    }
    if (key === '*') {
        event.preventDefault();
        calculator.chooseOperation('*');
        calculator.updateDisplay();
    }
    if (key === '/') {
        event.preventDefault();
        calculator.chooseOperation('/');
        calculator.updateDisplay();
    }
    
    // Equals
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    
    // Clear
    if (key === 'Escape') {
        event.preventDefault();
        calculator.clear();
        calculator.updateDisplay();
    }
    
    // Delete/Backspace
    if (key === 'Backspace') {
        event.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
    }
    
    // Percent
    if (key === '%') {
        event.preventDefault();
        calculator.percent();
        calculator.updateDisplay();
    }
});

// Prevent form submission on Enter
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'BUTTON') {
        event.preventDefault();
    }
});