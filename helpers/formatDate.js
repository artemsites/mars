/**
 * Функция формата даты в другой вид
 * 
 * @version 1.1 - 29.12.2023
 * @gist https://gist.github.com/artemsites/d21c3ca7b6a923b34caaca0a703f1343
 * @param { date } String|Date: new Date(2025, 4, 9) | new Date() | Date.now() | '2025-12-01' | '2025.12.01' | и возможно другие валидные строки дат
 * @param { sep } String: '.' | '-' | '/' | и т.п.
 * @param { date } String: dmy | ymd
 * @returns '01.12.2025' | '01-12-2025' | '01/12/2025' 
 */
export function formatDate({date = new Date(), sep='.', order = 'dmy' }) { 
  let d = new Date(date);

  const year = d.toLocaleString('default', {
    year: 'numeric',//'2-digit'
  });
  const month = d.toLocaleString('default', {month: '2-digit'});
  const day = d.toLocaleString('default', {day: '2-digit'});

  switch (order) {
    case 'dmy':
      return [day, month, year].join(sep);
      break;
    case 'ymd':
      return [year, month, day].join(sep);
      break;
    default:
      break;
  }
}