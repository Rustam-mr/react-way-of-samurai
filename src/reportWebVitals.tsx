import { ReportHandler, Metric } from 'web-vitals'; // Возможно, понадобится импорт Metric

const reportWebVitals: ReportHandler = onPerfEntry => {
  if (onPerfEntry && typeof onPerfEntry === 'function') { // Используем typeof function вместо instanceof
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      
      // Явно приводим тип onPerfEntry к ReportHandler при вызове функций get*
      const handler = onPerfEntry as ReportHandler; 
      
      getCLS(handler);
      getFID(handler);
      getFCP(handler);
      getLCP(handler);
      getTTFB(handler);
    });
  }
};

export default reportWebVitals;
