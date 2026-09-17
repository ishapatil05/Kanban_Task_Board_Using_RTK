import TaskCard from "./TaskCard";

const Column = ({ title, tasks }) => {
  return (
    <div className="column">
      <h2>
        {title} ({tasks.length})
      </h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
