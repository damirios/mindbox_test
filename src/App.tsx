import "./global.css";
import { TodosBlock } from "./components/TodosBlock/TodosBlock";
import { TTask } from "./utils/types";

const mockData: TTask[] = [
    { text: "тестовое задание", cleared: false, completed: false, id: "1" },
    { text: "прекрасный код", cleared: false, completed: true, id: "2" },
    { text: "покрытие тестами", cleared: false, completed: false, id: "3" },
];

function App() {
    return (
        <div className="App">
            <h1 className="title">todos</h1>
            <TodosBlock list={mockData} />
        </div>
    );
}

export default App;
