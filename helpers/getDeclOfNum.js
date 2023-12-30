/**
 * @example getDeclOfNum(5, ['минута', 'минуты', 'минут']); // вернёт — 1 минут 
 * 
 * @source https://realadmin.ru/coding/sklonenie-na-javascript.html
 * 
 * @version 1.0 - 20.09.2023
 * @param {Number} n: 5
 * @param {Array} wordForms: ['минута', 'минуты', 'минут']
 * @returns {String} "5 минут"
 */
export function getDeclOfNum(n, wordForms) {  
  n = Math.abs(n) % 100; 
  var n1 = n % 10;
  if (n > 10 && n < 20) { return wordForms[2]; }
  if (n1 > 1 && n1 < 5) { return wordForms[1]; }
  if (n1 == 1) { return wordForms[0]; }
  return wordForms[2];
}