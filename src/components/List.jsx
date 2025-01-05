import TodoItem from "./TodoItem";
import { TodoStateContext } from "../App";
import { useState, useMemo, useContext } from "react";
import "../css/List.css";

const List = () => {
  const [search, setSearch] = useState("");
  const todos = useContext(TodoStateContext);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    } else {
      return todos.filter((todo) =>
        todo.content.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((item) => item.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  // const { totalCount, doneCount, notDoneCount } = getAnaylizedData();

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>전체: {totalCount}</div>
        <div>완료: {doneCount}</div>
        <div>미완료: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력해주세요."
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
