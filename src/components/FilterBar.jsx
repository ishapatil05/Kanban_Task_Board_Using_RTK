import { useSelector, useDispatch } from "react-redux";
import {
  searchChanged,
  priorityChanged,
  selectPriority,
  selectSearch,
} from "../features/filters/filterSlice";

const FilterBar = () => {
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);
  const priority = useSelector(selectPriority);
  return (
    <div className="filter-bar">
      <h2>Search</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => dispatch(searchChanged(e.target.value))}
      />

      <select
        value={priority}
        onChange={(e) => dispatch(priorityChanged(e.target.value))}
      >
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default FilterBar;
