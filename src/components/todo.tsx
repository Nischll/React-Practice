// import { useState } from "react";

// function TodoApp() {
//   const [todos, setTodos] = useState(["Learn React"]);
//   const [input, setInput] = useState("");

//   const addTodo = () => {
//     setTodos([...todos, input]);
//     setInput("");
//   };

//   return (
//     <div>
//       <h1>My To-Do List</h1>
//       <ol>
//         {todos.map((todo, index) => (
//           <li key={index}>{todo}</li>
//         ))}
//       </ol>
//       <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="ADD MORE" className="border-2 border-slate-900"/>
//       <button onClick={addTodo}>Add Task</button>
//     </div>
//   );
// }

// export default TodoApp;



// const TextInput = () => {
//   const [text, setText] = useState("");

//   const handleChange = (event) => {
//     setText(event.target.value);
//     // console.log(text);
//   };

//   return (
//     <>
//     <input type="text" value={text} onChange={handleChange} placeholder="write sthg" className="border-2 border-slate-900"/>
//     <h1 className="underline decoration-red-500 text-xl"><strong>Demo:</strong> {text}</h1>
//     </>
    
//   );
// };

// export default TextInput;



import { useState, useCallback } from 'react';
import Child from "./usememo";
function Parent() {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const toggleMessage = useCallback(() => {
    setShowMessage((prev) => !prev);
  }, []);

  // function toggleMessage () {
  //   setShowMessage((prev) => !prev);
  // }

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <Child toggleMessage={toggleMessage} />
      {showMessage && <p>Here’s a toggled message!</p>}
    </div>
  );
}

export default Parent;
