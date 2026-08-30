import { useState, useEffect } from "react";
import Bitmap from "../../public/assets/images/Bitmap.jpg";
import Bitmap1 from "../../public/assets/images/Bitmap1.jpg";
import { Link } from "react-router";

import moon from "../../public/assets/icons/moon.svg";
import sun from "../../public/assets/icons/sun.png";

import check from "../../public/assets/icons/Check.png";
import check_dark from "../../public/assets/icons/Check dark.png";

import no from "../../public/assets/icons/no-check.png";
import Li from "./li/li";

function App() {
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState(true); // true = light, false = dark
  const [ul, setUl] = useState("All");

  // Yangi todo qo'shish
  function createToDo(e) {
    e.preventDefault();
    const value = e.target.new.value.trim();
    if (!value) return;

    const newTodoItem = {
      id: Date.now(), // unik ID
      value: value,
      check: false,
    };

    e.target.new.value = "";
    setTodos((prev) => [...prev, newTodoItem]);
  }

  // Toggle todo check
  function CheckToDo(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, check: !todo.check } : todo
    );
    setTodos(updatedTodos);
  }

  // Clear completed todos
  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.check));
  }

  // Load from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("Todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const bg = mode ? "#FAFAFA" : "#171823";
  const bgInp = mode ? "#FFFFFF" : "#25273D";
  const bgi = mode ? Bitmap : Bitmap1;

  // Filterlangan todos
  const filteredTodos = todos.filter((todo) =>
    ul === "All" ? true : ul === "Active" ? !todo.check : todo.check
  );

  return (
    <div
      className="min-h-screen transition-all duration-700 ease-in-out"
      style={{ backgroundColor: bg }}
    >
      <Link to="/My-portfolio/projects">
        <span className="text-5xl text-white absolute top-5 right-5">
          &times;
        </span>
      </Link>
      <nav
        className="bg-no-repeat bg-[length:100%_300px] py-12 px-6 transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${bgi})` }}
      >
        <div className="max-w-[540px] w-full mx-auto transition-all duration-700 ease-in-out">
          <div className="flex items-center justify-between text-white mb-10">
            <h1 className="text-3xl font-bold tracking-[10px]">TODO</h1>
            <img
              onClick={() => setMode(!mode)}
              src={mode ? moon : sun}
              alt="theme"
              className="w-6 h-6 cursor-pointer transition-transform duration-500 ease-in-out hover:rotate-360"
            />
          </div>

          {/* Todo input */}
          <form
            onSubmit={createToDo}
            className="flex items-center gap-6 shadow-[0_35px_50px_-15px_rgba(194,195,214,0.5)] rounded-[5px] h-[54px] px-5 transition-all duration-700 ease-in-out"
            style={{ backgroundColor: bgInp }}
          >
            <button type="submit">
              <img
                src={mode ? no : check_dark}
                alt="check-toggle"
                className="cursor-pointer w-5 h-5"
              />
            </button>
            <input
              name="new"
              type="text"
              placeholder="Create a new todo…"
              className="w-full outline-none border-none bg-transparent text-[#9495A5] text-[18px] font-[400] font-[Josefin Sans] placeholder-[#9495A5]"
            />
          </form>

          {/* Todo list */}
          <div
            className="mt-6 rounded-[5px] p-5 transition-all duration-700 ease-in-out"
            style={{
              backgroundColor: bgInp,
              boxShadow: `0px 35px 50px -15px ${
                mode ? "#C2C3D680" : "#00000080"
              }`,
            }}
          >
            <ul className="flex flex-col items-center w-full">
              {filteredTodos.map((todo) => (
                <Li
                  key={todo.id}
                  id={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                  text={todo.value}
                  check={todo.check}
                  onToggle={() => CheckToDo(todo.id)}
                  mode={mode}
                />
              ))}
            </ul>

            {/* Footer */}
            <div className="flex items-center justify-between mt-5 text-[#9495A5] text-[14px]">
              <p>
                {ul === "All"
                  ? todos.length
                  : ul === "Active"
                  ? todos.filter((t) => !t.check).length
                  : todos.filter((t) => t.check).length}{" "}
                items left
              </p>
              <ul className="flex items-center gap-5">
                {["All", "Active", "Completed"].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer"
                    onClick={() => setUl(item)}
                    style={{ color: ul === item ? "#3A7CFD" : "#494C6B" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p
                onClick={clearCompleted}
                className="cursor-pointer hover:text-[#494C6B]"
              >
                Clear Completed
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
