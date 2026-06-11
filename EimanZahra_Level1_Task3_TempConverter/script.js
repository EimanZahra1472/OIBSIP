// DOM Elements
const inputValue = document.getElementById('inputValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const resultValue = document.getElementById('resultValue');
const resultUnit = document.getElementById('resultUnit');
const errorMsg = document.getElementById('errorMsg');
const inputUnitBadge = document.getElementById('inputUnitBadge');

// Unit symbols mapping
const unitSymbols = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K'
};

// Update input badge when fromUnit changes
function updateInputBadge() {
    const selected = fromUnit.value;
    inputUnitBadge.textContent = unitSymbols[selected];
}

// Conversion functions
function toCelsius(value, from) {
    switch(from) {
        case 'celsius':
            return value;
        case 'fahrenheit':
            return (value - 32) * 5/9;
        case 'kelvin':
            return value - 273.15;
        default:
            return value;
    }
}

function fromCelsius(celsius, to) {
    switch(to) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
        default:
            return celsius;
    }
}

// Main conversion function
function convertTemperature() {
    // Get input value
    let value = parseFloat(inputValue.value);
    
    // Validation
    if (isNaN(value)) {
        errorMsg.classList.add('show');
        resultValue.textContent = '???';
        return;
    }
    
    errorMsg.classList.remove('show');
    
    const from = fromUnit.value;
    const to = toUnit.value;
    
    // Convert to Celsius first (base unit)
    const celsius = toCelsius(value, from);
    
    // Convert from Celsius to target unit
    let converted = fromCelsius(celsius, to);
    
    // Format result to 2 decimal places
    let formattedValue = converted.toFixed(2);
    
    // Remove .00 if it's a whole number
    if (formattedValue.endsWith('.00')) {
        formattedValue = Math.round(converted).toString();
    }
    
    // Display result
    resultValue.textContent = formattedValue;
    resultUnit.textContent = unitSymbols[to];
    
    // Add visual feedback
    resultValue.style.transform = 'scale(1.1)';
    setTimeout(() => {
        resultValue.style.transform = 'scale(1)';
    }, 200);
}

// Swap from and to units
function swapUnits() {
    const fromVal = fromUnit.value;
    const toVal = toUnit.value;
    
    fromUnit.value = toVal;
    toUnit.value = fromVal;
    
    updateInputBadge();
    convertTemperature();
    
    // Visual feedback
    swapBtn.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        swapBtn.style.transform = 'rotate(0deg)';
    }, 300);
}

// Event Listeners
convertBtn.addEventListener('click', convertTemperature);
swapBtn.addEventListener('click', swapUnits);

// Convert on Enter key
inputValue.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});

// Auto-convert when units change
fromUnit.addEventListener('change', () => {
    updateInputBadge();
    convertTemperature();
});
toUnit.addEventListener('change', convertTemperature);

// Real-time validation and conversion
inputValue.addEventListener('input', () => {
    if (inputValue.value === '') {
        errorMsg.classList.add('show');
        resultValue.textContent = '???';
    } else {
        errorMsg.classList.remove('show');
        convertTemperature();
    }
});

// Initial setup
updateInputBadge();
convertTemperature();