import { memo, useContext } from "react";
import { TodoDispatchContext } from "../App";
import "../css/TodoItem.css";

const TodoItem = ({ id, checked, content, date }) => {
  const { update, deleteTodo } = useContext(TodoDispatchContext);
  const onChangeCheckbox = () => {
    update(id);
  };

  const onClickButton = () => {
    deleteTodo(id);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" checked={checked} onChange={onChangeCheckbox} />
      <div className="contents">{content}</div>
      <div className="date">{new Date(date).toLocaleString()}</div>
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);
