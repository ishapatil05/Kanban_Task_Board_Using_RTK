import {
  deleteTask,
  updateTask,
  selectSaving,
  selectTaskError,
} from "../features/tasks/tasksSlice";
import { useSelector, useDispatch } from "react-redux";
const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const saving = useSelector(selectSaving);
  const error = useSelector(selectTaskError);

  const moveForward = () => {
    let newStatus;

    if (task.status === "todo") {
      newStatus = "in-progress";
    } else if (task.status === "in-progress") {
      newStatus = "done";
    } else {
      return;
    }

    dispatch(
      updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: newStatus,
      }),
    );
  };

  const moveBackward = () => {
    let newStatus;
    if (task.status === "done") {
      newStatus = "in-progress";
    } else if (task.status === "in-progress") {
      newStatus = "todo";
    } else {
      return;
    }

    dispatch(
      updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: newStatus,
      }),
    );
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <strong>{task.priority}</strong>
      <p>{task.status}</p>

      <button
        onClick={moveBackward}
        disabled={saving || task.status === "todo"}
      >
        ← Back
      </button>

      <button onClick={moveForward} disabled={saving || task.status === "done"}>
        Move →
      </button>

      <button onClick={handleDelete} disabled={saving}>
        Delete
      </button>
      {saving && <p>Saving...</p>}

      {error && <p>{error}</p>}
    </div>
  );
};

export default TaskCard;
