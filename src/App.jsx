import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import "./App.css";
import { useState, useRef, useReducer } from "react";

const mockData = [
  {
    id: 1,
    checked: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    checked: false,
    content: "명상하기",
    date: new Date().getTime(),
  },
  {
    id: 3,
    checked: false,
    content: "요가하기",
    date: new Date().getTime(),
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.id ? { ...item, checked: !item.checked } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  const create = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        checked: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const update = (id) => {
    dispatch({
      type: "UPDATE",
      id: id,
    });
  };

  const deleteTodo = (id) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  };

  return (
    <>
      <div className="App">
        <Header />
        <Editor create={create} />
        <List todos={todos} update={update} deleteTodo={deleteTodo} />
      </div>
    </>
  );
}

export default App;
