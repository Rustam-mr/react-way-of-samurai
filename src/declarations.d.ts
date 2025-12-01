// Глобальное объявление для всех CSS модулей
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  // Если вы используете SCSS/SASS, добавьте и для него:
  // declare module '*.module.scss' {
  //   const classes: { [key: string]: string };
  //   export default classes;
  // }

  declare module '*.png' {
    const value: string;
    export default value;
  }
  // You can add other types too:
  // declare module '*.jpg';
  // declare module '*.jpeg';
  declare module '*.svg';
  // declare module '*.gif';