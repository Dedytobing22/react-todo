import { useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";

const AllPage = () => {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <>
      {todos.length === 0 ? (
        <p className="text-center font-medium rounded-lg text-slate-500">Empty Todo</p>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllPage;
