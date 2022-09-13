// Форматирование процентов под нормальный формат
export const percentFormatter = new Intl.NumberFormat('ru-RU', {style: 'percent', maximumFractionDigits: 3});
export const priceFormatter = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0});
export const priceFormatterDecimals = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 2});