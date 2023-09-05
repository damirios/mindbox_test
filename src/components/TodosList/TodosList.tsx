import { TTask } from "../../utils/types";
import { TodosItem } from "../TodosItem/TodosItem";
import s from "./styles.module.css";

interface ITodosListProps {
    tasks: TTask[];
    handleItemClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export function TodosList({ tasks, handleItemClick }: ITodosListProps) {
    return (
        <ul className={s.todos_list}>
            {tasks.map((task) => (
                <TodosItem handleItemClick={handleItemClick} key={task.id} task={task} />
            ))}
        </ul>
    );
}
