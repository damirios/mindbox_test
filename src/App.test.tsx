import App from "./App";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("отрисована страница", () => {
    test("отрисован заголовок страницы с текстом todos", () => {
        render(<App />);
        const title = screen.getByText("todos");
        expect(title).toBeInTheDocument();
    });

    test("отрисован инпут с плейсхолдером What needs to be done?", () => {
        render(<App />);
        const input = screen.getByPlaceholderText("What needs to be done?");
        expect(input).toBeInTheDocument();
    });

    test("отрисованы кнопки управления", () => {
        render(<App />);
        const allButton = screen.getByText("All");
        expect(allButton).toBeInTheDocument();
        const completedButton = screen.getByText("Completed");
        expect(completedButton).toBeInTheDocument();
        const activeButton = screen.getByText("Active");
        expect(activeButton).toBeInTheDocument();
    });
});
