import { percentFormatter } from "./formatters.js";

// Проценты для программ -- program rates
const programBase = 0.12;
const programIt = 0.045;
const programGov = 0.062;
const programZero = 0.112;

// Показ ставок на странице -- show program rates on the page
document.querySelector('#base-value').value = programBase;
document.querySelector('#it-value').value = programIt;
document.querySelector('#gov-value').value = programGov;
document.querySelector('#zero-value').value = programZero;

// Отображение ставок на кнопках -- show rates on labels 
const baseText = document.querySelector('#base-text');
const itText = document.querySelector('#it-text');
const govText = document.querySelector('#gov-text');
const zeroText = document.querySelector('#zero-text');

// Вывод пользователю форматированные проценты -- formatter percent on labels
baseText.innerText = percentFormatter.format(programBase);
itText.innerText = percentFormatter.format(programIt);
govText.innerText = percentFormatter.format(programGov);
zeroText.innerText = percentFormatter.format(programZero);

// Отображение выбранной ставки -- show target rate
const programInputs = document.querySelectorAll('input[name="program"]');
const totalPercent = document.querySelector('#total-percent');
programInputs.forEach((input) => {
    if (input.checked) {
        totalPercent.innerText = percentFormatter.format(input.value); // start page
    }
    input.addEventListener('click', function() {
        totalPercent.innerText = percentFormatter.format(this.value); // toogle rate
    })
})
