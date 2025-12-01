import React from "react"
// Импортируем только render и screen из testing-library/react
import { render, screen, fireEvent } from "@testing-library/react"
// Также понадобится userEvent для имитации действий пользователя
import userEvent from "@testing-library/user-event"
import ProfileStatus from "./ProfileStatus"
import '@testing-library/jest-dom'

// describe - это блок для группировки тестов
describe("ProfileStatus component (@testing-library/react)", () => {

    // Define a default mock function to satisfy the required prop for tests 1-4
    const mockUpdateStatus = jest.fn()

    // Тест 1: Статус из пропсов должен отображаться в <span>
    test("status from props should be in the document initially", () => {
        render(<ProfileStatus status="it-kamasutra.com" updateStatus={mockUpdateStatus} />)
        // Ищем элемент с текстом статуса. Если его нет, тест упадет.
        const statusElement = screen.getByText("it-kamasutra.com")
        expect(statusElement).toBeInTheDocument()
    })

    // Тест 2: Изначально <input> не должен отображаться
    test("after creation <input> shouldn't be displayed", () => {
        render(<ProfileStatus status="it-kamasutra.com" updateStatus={mockUpdateStatus} />)
        // Используем queryByRole (для input), который возвращает null, если элемент не найден.
        // expect().toThrow() из react-test-renderer заменяется на expect(...).toBeNull()
        const inputElement = screen.queryByRole("textbox")
        expect(inputElement).toBeNull()
    })

    // Тест 3: <span> должен быть отображен изначально
    test("after creation <span> should be displayed", () => {
        render(<ProfileStatus status="it-kamasutra.com" updateStatus={mockUpdateStatus} />)
        // Ищем элемент роли "generic" (span/div) с текстом статуса
        const spanElement = screen.getByText("it-kamasutra.com")
        expect(spanElement).toBeInTheDocument() // Проверяем его наличие
    })

    // Тест 4: При двойном клике <span> должен исчезнуть, а <input> появиться с правильным значением
    test("input should be displayed in editMode instead of span upon double click", () => {
        render(<ProfileStatus status="it-kamasutra.com" updateStatus={mockUpdateStatus} />)
        
        // 1. Находим <span> и имитируем двойной клик
        const spanElement = screen.getByText("it-kamasutra.com")
        fireEvent.doubleClick(spanElement)
        // userEvent.dblClick(spanElement); // Альтернатива с user-event

        // 2. <span> должен исчезнуть (используем queryByText для проверки отсутствия)
        expect(screen.queryByText("it-kamasutra.com")).toBeNull()

        // 3. <input> должен появиться
        const inputElement = screen.getByRole("textbox")
        expect(inputElement).toBeInTheDocument()
        
        // 4. Проверяем значение input
        expect(inputElement).toHaveValue("it-kamasutra.com")
    })

    // Тест 5: Callback должен быть вызван при деактивации режима редактирования
    test("callback should be called when exiting edit mode", () => {
        const localMockUpdateStatus = jest.fn() 
        render(<ProfileStatus status="test status" updateStatus={localMockUpdateStatus} />)
        
        // 1. Переходим в режим редактирования
        fireEvent.doubleClick(screen.getByText("test status"))
        const inputElement = screen.getByRole("textbox")

        // 2. Имитируем потерю фокуса (blur) или нажатие Enter для выхода из режима
        fireEvent.blur(inputElement) 
        // Или fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        // 3. Проверяем, что mock-функция была вызвана 1 раз
        expect(localMockUpdateStatus).toHaveBeenCalledTimes(1)
        expect(localMockUpdateStatus).toHaveBeenCalledWith("test status") // Проверяем, с какими аргументами вызвана
    })
})