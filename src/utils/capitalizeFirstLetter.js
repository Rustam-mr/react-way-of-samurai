export function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length === 0) {
      return '';
    }
    
    // Берем первый символ и делаем его заглавным
    const firstLetter = str.charAt(0).toUpperCase();
    
    // Берем остаток строки, начиная со второго символа
    const restOfString = str.slice(1);
    
    // Объединяем результат
    return firstLetter + restOfString;
}