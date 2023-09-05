import "./global.css";
import { TodosBlock } from "./components/TodosBlock/TodosBlock";

function App() {
    return (
        <div className="App">
            <h1 className="title">todos</h1>
            <TodosBlock />
        </div>
    );
}

export default App;
