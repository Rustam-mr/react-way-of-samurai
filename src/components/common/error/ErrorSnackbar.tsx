import React, { useEffect } from 'react'
import styles from './ErrorSnackbar.module.css' // Создайте этот файл стилей

type MapPropsType = {
  message: string 
}

type DispatchPropsType = {
  clearError: () => void
}

const ErrorSnackbar: React.FC<MapPropsType & DispatchPropsType> = ({ message, clearError }) => {
  useEffect(() => {
    // Устанавливаем таймаут на 5 секунд (5000 мс) для автоматического закрытия
    const timer = setTimeout(() => {
      clearError()
    }, 5000)

    // Функция очистки при размонтировании компонента или изменении message/clearError
    return () => {
      clearTimeout(timer)
    }
  }, [message, clearError])

  return (
    <div className={styles.snackbar}>
      <span>{message}</span>
      <button onClick={clearError} className={styles.closeButton}>&times;</button>
    </div>
  )
}

export default ErrorSnackbar