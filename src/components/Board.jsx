import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchTasks,
  selectTaskStatus,
  selectTaskError,
  selectFilteredTasks,
} from "../features/tasks/tasksSlice";
import Column from "./Column";

const Board = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectFilteredTasks);
  const status = useSelector(selectTaskStatus);
  const error = useSelector(selectTaskError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (status === "failed") {
    return <h2 className="error-message">Error:{error}</h2>;
  }

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <>
    
      <div className="board">
               
        {tasks.length === 0 ? (
          <h2 className="no-tasks">No tasks</h2>
        ) : (
          <>
            <Column title="To Do" tasks={todoTasks} />
            <Column title="In Progress" tasks={inProgressTasks} />
            <Column title="Done" tasks={doneTasks} />
          </>
        )}
      </div>
    </>
  );
};

export default Board;
