import React, { useState } from "react"
import styles from "./style.module.css" // Используем ваш существующий импорт
import cn from "classnames"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number 
    onPageChanged: (pageNumber: number) => void
    portionSize?: number 
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={styles.paginator}>
            { portionNumber > 1 &&
                <button className={styles.navButton} onClick={ () => { setPortionNumber(portionNumber - 1) }}>&laquo; Предыдущая</button>
            }

            {pages.filter(p => {
                return p >= leftPortionPageNumber && p <= rightPortionPageNumber
            })
                .map(p => {
                    return <span key={p} className={cn(styles.page, {[styles.selectPage as string]: currentPage === p})} onClick={e => onPageChanged(p)}>{p}</span>
                })}
            {
                portionCount > portionNumber &&
                <button className={styles.navButton} onClick={ () => setPortionNumber(portionNumber + 1) }>Следующая &raquo;</button>
            }
        </div>
    )
}

export default Paginator