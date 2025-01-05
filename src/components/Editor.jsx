import "../css/Editor.css";
import { useState, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
  const [content, setContent] = useState("");
  const { create } = useContext(TodoDispatchContext);

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const submit = () => {
    create(content);
  };

  return (
    <div className="Editor">
      <input
        value={content}
        onChange={changeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={submit}>추가</button>
    </div>
  );
};

export default Editor;
