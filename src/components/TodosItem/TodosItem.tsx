import { TTask } from "../../utils/types";

import s from "./styles.module.css";

import checkIcon from "./check_icon.svg";

interface ITodosItemProps {
    task: TTask;
    handleItemClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export function TodosItem({ task, handleItemClick }: ITodosItemProps) {
    if (task.cleared) {
        return null;
    }

    return (
        <li
            onClick={handleItemClick}
            id={`task_${task.id}`}
            className={`${s.todos_item} ${task.completed ? s.todos_item_completed : ""}`}
        >
            <div className={s.item_checkbox}>
                {task.completed && <img className={s.item_checkbox_icon} src={checkIcon} alt="check" />}
            </div>
            <div className={`${s.item_text} ${task.completed ? s.item_text_completed : ""}`}>{task.text}</div>
        </li>
    );
}
