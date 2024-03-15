import { NavLink, Outlet } from "react-router-dom";
import { actions } from "../features/todos/todosSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const userInput = useSelector((state) => state.todos.userInput);
  const dispatch = useDispatch();

  const handleCreateTodo = (e) => {
    e.preventDefault();
    dispatch(actions.createTodo());
  };

  function activeClass(path) {
    const location = useLocation();
    return location.pathname === path ? "bg-cyan-600" : "bg-slate-400";
  }

  const handleSetUserInput = (userInput) => {
    dispatch(actions.setUserInput({ userInput }));
  };

  return (
    <div>
      <h1 className="font-bold text-4xl mt-20 mb-10 text-center">
        What's the plan for today?
      </h1>
      <div className="max-w-xl mx-auto">
        <form className="flex gap-2 p-2 mx-auto" onSubmit={handleCreateTodo}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleSetUserInput(e.target.value)}
            placeholder="Add your todo...."
            className="p-3 w-full border-slate-400 border-2 rounded-lg text-xl"
          />
          <input
            type="submit"
            className="p-3 btn bg-cyan-600 hover:bg-cyan-500 text-white"
            value="Add"
          />
        </form>
        <nav>
          <ul className="flex gap-2 p-2 font-normal text-lg my-3 text-white">
            <li
              className={`rounded-full px-5 py-1 hover:bg-cyan-500 ${activeClass("/")}`}
            >
              <NavLink to={"/"}>All</NavLink>
            </li>
            <li
              className={`rounded-full px-5 py-1 hover-bg-cyan-500 ${activeClass("/active")}`}
            >
              <NavLink to={"/active"}>Active</NavLink>
            </li>
            <li
              className={`rounded-full px-5 py-1 hover-bg-cyan-500 ${activeClass("/completed")}`}
            >
              <NavLink to={"/completed"}>Completed</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <section className="p-2">
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
