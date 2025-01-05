import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import "./App.css";
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";

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

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  const create = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        checked: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const update = useCallback((id) => {
    dispatch({
      type: "UPDATE",
      id: id,
    });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { create, update, deleteTodo };
  }, []);

  return (
    <>
      <div className="App">
        <Header />
        <TodoStateContext.Provider value={todos}>
          <TodoDispatchContext.Provider value={memoizedDispatch}>
            <Editor />
            <List />
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
      </div>
    </>
  );
}

export default App;
