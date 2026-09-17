import "./App.css";
import Board from "./components/Board";
import AddTaskForm from "./components/AddTaskForm";
import FilterBar from "./components/FilterBar";
function App() {
  return (
    <>
      <AddTaskForm />
      <FilterBar />
      <Board />
    </>
  );
}

export default App;
