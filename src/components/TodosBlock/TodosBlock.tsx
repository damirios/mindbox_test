import React, { useState } from "react";
import { TFilter, TTask } from "../../utils/types";
import { TodosList } from "../TodosList/TodosList";

import s from "./styles.module.css";

import inputIcon from "./input_icon.svg";
import { TodosMenu } from "../TodosMenu/TodosMenu";

export function TodosBlock({ list }: { list: TTask[] }) {
    const [tasks, setTasks] = useState<TTask[]>(list);
    const [tasksFilter, setTasksFilter] = useState<TFilter>("all");
    const [value, setValue] = useState<string>("");

    function handleItemClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        const target = (e.target as HTMLElement).closest("li");
        if (target) {
            const id = target.id.split("_")[1];
            const newTasks = tasks.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            });
            setTasks(newTasks);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const lastId = tasks[tasks.length - 1]?.id || 0;
        setTasks([...tasks, { text: value, id: (+lastId + 1).toString(), completed: false, cleared: false }]);
        setValue("");
    }

    function handleClearCompletedTasks() {
        setTasks(
            tasks.map((task) => {
                return { ...task, cleared: task.completed };
            })
        );
    }

    function filterTasks(task: TTask) {
        if (tasksFilter === "all") {
            return true;
        } else if (tasksFilter === "active") {
            return !task.completed;
        } else if (tasksFilter === "completed") {
            return task.completed;
        }
    }

    const tasksToShow = tasks.filter(filterTasks);

    return (
        <div className={s.todos_block}>
            <div className={s.todos_input_box}>
                <img className={s.todos_input_icon} src={inputIcon} alt="arrow_down" />
                <input
                    data-testid="input_test"
                    value={value}
                    onChange={handleInputChange}
                    className={s.todos_input}
                    placeholder="What needs to be done?"
                />
                {value.trim() !== "" && (
                    <button onClick={handleSubmit} className={s.todos_add_button}>
                        add task
                    </button>
                )}
            </div>
            <TodosList handleItemClick={handleItemClick} tasks={tasksToShow} />
            <TodosMenu
                tasks={tasks}
                showAll={() => setTasksFilter("all")}
                showActive={() => setTasksFilter("active")}
                showCompleted={() => setTasksFilter("completed")}
                clearCompleted={handleClearCompletedTasks}
                filter={tasksFilter}
            />
        </div>
    );
}
