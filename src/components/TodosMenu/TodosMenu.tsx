import { TFilter, TTask } from "../../utils/types";
import s from "./styles.module.css";

interface ITodosMenuProps {
    tasks: TTask[];
    showAll: () => void;
    showActive: () => void;
    showCompleted: () => void;
    clearCompleted: () => void;
    filter: TFilter;
}

export function TodosMenu({ tasks, showAll, showActive, showCompleted, clearCompleted, filter }: ITodosMenuProps) {
    const incompleteTasksCount = tasks.reduce((prev, curr) => prev + (curr.completed ? 0 : 1), 0);
    const countWord = incompleteTasksCount === 1 ? "item left" : "items left";

    return (
        <div className={s.menu}>
            <div className={s.menu_tasks_count}>
                {incompleteTasksCount} {countWord}
            </div>
            <div className={s.menu_filter_buttons}>
                <button
                    className={`${s.menu_button} ${filter === "all" ? s.menu_button_active : ""}`}
                    onClick={showAll}
                >
                    All
                </button>
                <button
                    className={`${s.menu_button} ${filter === "active" ? s.menu_button_active : ""}`}
                    onClick={showActive}
                >
                    Active
                </button>
                <button
                    className={`${s.menu_button} ${filter === "completed" ? s.menu_button_active : ""}`}
                    onClick={showCompleted}
                >
                    Completed
                </button>
            </div>
            <button className={s.menu_button} onClick={clearCompleted}>
                Clear completed
            </button>
        </div>
    );
}
