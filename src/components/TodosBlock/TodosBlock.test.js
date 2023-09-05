import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodosBlock } from "./TodosBlock";

describe("добавление задания", () => {
    const mockTasks = [];

    test("изначально нет ни одного задания", () => {
        render(<TodosBlock list={mockTasks} />);
        const listItems = screen.queryAllByTestId("li_test");
        expect(listItems.length).toBe(0);
    });

    test("кнопка добавления задания появляется при вводе текста, и новое задание добавляется при нажатии на кнопку. Инпут очищается", () => {
        render(<TodosBlock list={mockTasks} />);
        const input = screen.queryByTestId("input_test");

        expect(input).not.toBeNull();
        expect(screen.queryByText("add task")).toBeNull();

        fireEvent.input(input, {
            target: {value: "new_task_123"}
        });

        const submitButton = screen.getByText("add task");
        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton);
        expect(screen.getByText("new_task_123")).toBeInTheDocument();
        expect(screen.queryAllByTestId("li_test").length).toBe(1);
        expect(screen.queryByTestId("input_test")).toContainHTML("");
    });
});

describe("смена фильтров", () => {
    const mockTasks = [
        { text: "тестовое задание", cleared: false, completed: false, id: "1" },
        { text: "прекрасный код", cleared: false, completed: true, id: "2" },
        { text: "покрытие тестами", cleared: false, completed: false, id: "3" },
    ];

    test("Изначально отображены все 3 задания. После нажатия на active должно остаться 2 задания", () => {
        render(<TodosBlock list={mockTasks} />);

        expect(screen.queryAllByTestId("li_test").length).toBe(3);
        expect(screen.getByText("прекрасный код")).toBeInTheDocument();

        const activeFilterButton = screen.getByTestId("active_filter");
        fireEvent.click(activeFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(2);
        expect(screen.queryByText("прекрасный код")).toBeNull();
    });

    test("Изначально отображены все 3 задания. После нажатия на completed должно остаться 1 задание", () => {
        render(<TodosBlock list={mockTasks} />);

        expect(screen.queryAllByTestId("li_test").length).toBe(3);
        expect(screen.getByText("прекрасный код")).toBeInTheDocument();

        const completedFilterButton = screen.getByTestId("completed_filter");
        fireEvent.click(completedFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(1);
        expect(screen.getByText("прекрасный код")).toBeInTheDocument();
        expect(screen.queryByText("покрытие тестами")).toBeNull();
    });
});

describe("удаление выполненных заданий", () => {
    const mockTasks = [
        { text: "тестовое задание", cleared: false, completed: false, id: "1" },
        { text: "прекрасный код", cleared: false, completed: true, id: "2" },
        { text: "покрытие тестами", cleared: false, completed: false, id: "3" },
    ];

    test("После нажатия на clear completed выполненное задание должно удалиться", () => {
        render(<TodosBlock list={mockTasks} />);

        expect(screen.queryAllByTestId("li_test").length).toBe(3);

        const clearCompletedButton = screen.getByTestId("clear_completed");
        fireEvent.click(clearCompletedButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(2);
        expect(screen.queryByText("прекрасный код")).toBeNull();

        const completedFilterButton = screen.getByTestId("completed_filter");
        fireEvent.click(completedFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(0);

        const activeFilterButton = screen.getByTestId("active_filter");
        fireEvent.click(activeFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(2);

        const allFilterButton = screen.getByTestId("all_filter");
        fireEvent.click(allFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(2);
    });
});

describe("статус задания меняется. Отображается корректное кол-во активных заданий", () => {
    const mockTasks = [
        { text: "тестовое задание", cleared: false, completed: false, id: "1" },
        { text: "прекрасный код", cleared: false, completed: true, id: "2" },
        { text: "покрытие тестами", cleared: false, completed: false, id: "3" },
    ];

    test("Статус задания меняется с активно на выполнено и обратно", () => {
        render(<TodosBlock list={mockTasks} />);

        expect(screen.queryAllByTestId("li_test").length).toBe(3);

        const activeFilterButton = screen.getByTestId("active_filter");
        fireEvent.click(activeFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(2);

        // смена статуса с активно на выполнено
        fireEvent.click(screen.queryByText("покрытие тестами"));
        expect(screen.queryAllByTestId("li_test").length).toBe(1);
        expect(screen.queryByText("покрытие тестами")).toBeNull();

        const allFilterButton = screen.getByTestId("all_filter");
        fireEvent.click(allFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(3);
        expect(screen.getByText("покрытие тестами")).toBeInTheDocument();

        // смена статуса с выполнено на активно
        fireEvent.click(screen.queryByText("покрытие тестами"));
        fireEvent.click(activeFilterButton);
        expect(screen.queryAllByTestId("li_test").length).toBe(2);
        expect(screen.getByText("покрытие тестами")).toBeInTheDocument();
    });

    test("Отображается правильное число активных заданий", () => {
        render(<TodosBlock list={mockTasks} />);

        expect(screen.queryByTestId("tasks_count")).toContainHTML("2");

        fireEvent.click(screen.getByTestId("active_filter"));
        expect(screen.queryByTestId("tasks_count")).toContainHTML("2");

        fireEvent.click(screen.getByTestId("completed_filter"));
        expect(screen.queryByTestId("tasks_count")).toContainHTML("2");

        // смена статуса с активно на выполнено
        fireEvent.click(screen.getByTestId("all_filter"));
        fireEvent.click(screen.queryByText("покрытие тестами"));
        expect(screen.queryByTestId("tasks_count")).toContainHTML("1");

        fireEvent.click(screen.queryByText("покрытие тестами"));
        fireEvent.click(screen.queryByText("прекрасный код"));
        expect(screen.queryByTestId("tasks_count")).toContainHTML("3");
    });
});