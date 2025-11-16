import React from "react";
import { render, screen } from "@testing-library/react";
import Paginator from "./Paginator";

describe("Paginator component test (@testing-library/react)", () => {

    test("page count is 11 but should be only 10 page numbers displayed", () => {
        render(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} />);
        
        // Мы ищем все элементы, содержащие только цифры (которые являются ссылками на ваши страницы).
        // Распространённый шаблон — поиск элементов по их роли или просто по текстовому содержимому (номера страниц от 1 до 10).
        // Давайте используем getAllByRole('generic') в качестве запасного варианта или более подходящего запроса для вашей конкретной HTML-структуры.

        // Поскольку ваш HTML показывает элементы <span> с текстовым содержимым 1, 2, 3...
        // Мы можем проверить общее количество элементов span, видимых пользователю:

        // screen.getAllByRole('generic') обычно нацелен на элементы span/div.
        // Мы ожидаем, что будет 10 элементов span с номерами страниц *плюс* кнопка «Далее» (всего 11 универсальных ролей).

        // Лучший подход — запросить конкретный номер страницы, например, «10».
        const page10 = screen.getByText("10"); 
        expect(page10).toBeInTheDocument();
        
        // Исходный тест предполагал подсчёт всех числовых элементов. 
        // Давайте положимся на следующий тест, чтобы подтвердить поведение кнопки «Далее».
    });

    // Если вам нужно их точно посчитать:
    test("should display exactly 10 page number spans", () => {
         render(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} />);

         // You can use a regex to capture text content that matches a single or double digit number 
         // which is more robust than relying on data-testid
         const pageNumbers = screen.getAllByText(/^\d{1,2}$/); 
         expect(pageNumbers.length).toBe(10);
    });


    // Тест 2: Если страниц больше 10, должна присутствовать кнопка "NEXT"
    test("if page count is more then 10 button Next should be present", () => {
        render(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} />);
        
        // Ищем кнопку по ее тексту "Next", используя case-insensitive regex
        const nextButton = screen.getByText(/Next/i); // Use /Next/i for case-insensitivity

        // Проверяем, что кнопка присутствует в документе
        expect(nextButton).toBeInTheDocument();
    });
});