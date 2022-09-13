import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

// Inputs 
const inputCost = document.querySelector('#input-cost');
const inputPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');
const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalPayment = document.querySelector('#total-month-payment');
const sliderCost = document.querySelector('#slider-cost');
const sliderDownPayment = document.querySelector('#slider-downpayment');
const sliderYears = document.querySelector('#slider-years');
const maxPrice = 100000000;

// Settings format
const cleaveSettings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
}

// Formatting inputs
const cleaveCostFormt = new Cleave(inputCost, cleaveSettings);
const cleavePaymentFormt = new Cleave(inputPayment, cleaveSettings);
const cleaveFormt = new Cleave(inputTerm, cleaveSettings);

calcMorgage();

// Summ of credit -- расчитать сумму кредита
form.addEventListener('input', function(){
    calcMorgage();
});

function calcMorgage() {

    // Проверка макс суммы
    let cost = +cleaveCostFormt.getRawValue();
    if (cost > maxPrice) {
        cost = maxPrice;
    }
    // Общая сумма кредита
    const totalAmount = cost - cleavePaymentFormt.getRawValue();    
    totalCost.innerText = priceFormatter.format(totalAmount);

    // Ставка по кредиту
    const creditRate = +document.querySelector('input[name="program"]:checked').value;

    // Срок ипотеки в годах
    const morgageTermYears = +cleaveFormt.getRawValue();

    // Срок ипотеки в месяцах
    const morgageTermMounth = morgageTermYears * 12;

    // Месячная ставка
    const monthRate = creditRate / 12;

    // Рассчет месячного платежа
    const monthPayment = (totalAmount * monthRate) / 1 - (1 + monthRate) * (1 - morgageTermMounth);
    totalPayment.innerText = priceFormatterDecimals.format(monthPayment);
}

// Setting slider cost
noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    step: 100000,
    range: {
        'min': 0,
        '50%': [10000000],
        'max': maxPrice
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

// Setting slider downpayment
noUiSlider.create(sliderDownPayment, {
    start: 6000000,
    connect: 'lower',
    step: 100000,
    tooltips: true,
    range: {
        'min': 0,
        'max': 10000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});

// Setting slider years (terms)
noUiSlider.create(sliderYears, {
    start: 1,
    connect: 'lower',
    step: 1,
    tooltips: true,
    range: {
        'min': 1,    
        'max': 30
    },
    format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: '',
    }),
});

// First slider
sliderCost.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    cleaveCostFormt.setRawValue(sliderValue);
    calcMorgage();
});

// Second slider
sliderDownPayment.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderDownPayment.noUiSlider.get(true));
    cleavePaymentFormt.setRawValue(sliderValue);
    calcMorgage();
})

// Third slider
sliderYears.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderYears.noUiSlider.get(true));
    cleaveFormt.setRawValue(sliderValue);
    calcMorgage();
})

// Formatting inputCost
inputCost.addEventListener('input', function(){
    const value = +cleaveCostFormt.getRawValue();
    sliderCost.noUiSlider.set(value);
    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.add('param__details--error');
    } 
    if (value < maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
    }
    // Зависимость значений
    const percentMin = value * 0.15;
    const percentMax = value * 0.9;

    sliderDownPayment.noUiSlider.updateOptions({    
        range: {
            min: percentMin,
            max: percentMax
        }        
    })
    

})
inputCost.addEventListener('change', function(){
    const value = +cleaveCostFormt.getRawValue();
    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
        cleaveCostFormt.setRawValue(maxPrice);
    } 
})

// Formatting downpayment
inputPayment.addEventListener('input', function(){
    const value = +cleavePaymentFormt.getRawValue();
    sliderDownPayment.noUiSlider.set(value);
    if (value > 1000000) {
        inputPayment.closest('.param__details').classList.add('param__details--error');
    } 
    if (value < 1000000) {
        inputPayment.closest('.param__details').classList.remove('param__details--error');
    }    
})
inputPayment.addEventListener('change', function(){
    const value = +cleavePaymentFormt.getRawValue();
    if (value > 1000000) {
        inputPayment.closest('.param__details').classList.remove('param__details--error');
        cleavePaymentFormt.setRawValue(maxPrice);
    } 
})

// Formatting years
inputTerm.addEventListener('input', function(){
    const value = +cleaveFormt.getRawValue();
    sliderYears.noUiSlider.set(value);
    if (value > 30) {
        inputTerm.closest('.param__details').classList.add('param__details--error');
    } 
    if (value < 30) {
        inputTerm.closest('.param__details').classList.remove('param__details--error');
    }
})
inputTerm.addEventListener('change', function(){
    const value = +cleaveFormt.getRawValue();
    if (value > 30) {
        inputTerm.closest('.param__details').classList.remove('param__details--error');
        cleaveFormt.setRawValue(30);
    } 
})




