import {
  addTask,
  selectSaving,
  selectTaskError,
} from "../features/tasks/tasksSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddTaskForm = () => {
  const dispatch = useDispatch();

  const saving = useSelector(selectSaving);
  const error = useSelector(selectTaskError);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !priority) {
      return;
    }
    const newTask = {
      title: title.trim(),
      //it is similar as title:title
      description: description.trim(),
      priority,
      //it is similar as priority:priority
      status: "todo",
    };

    dispatch(addTask(newTask));

    setTitle("");
    setDescription("");
    setPriority("medium");
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h2>Add Task</h2>

        <input
          required
          type="text"
          placeholder="Task title "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          required
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          required
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit" disabled={saving}>
          {saving ? "saving..." : "Add Task"}
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AddTaskForm;
