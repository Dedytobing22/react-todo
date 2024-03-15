import { createSlice } from "@reduxjs/toolkit";
import { uniqueId } from "lodash";
import Swal from "sweetalert2";

// Inisialisasi state awal dengan lastUsedId
const initialState = {
  todos: [],
  userInput: "",
  lastUsedId: 0, 
};

const getCurrentDateTime = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const formattedHour = currentHour < 10 ? `0${currentHour}` : currentHour; 
  const formattedMinute = currentMinute < 10 ? `0${currentMinute}` : currentMinute;
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  return `${formattedHour}:${formattedMinute}, ${formattedDate}`;
};


export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload.userInput;
    },

    createTodo: (state) => {
      if (!state.userInput || state.userInput.trim() === "") return;
      const newTodo = {
        id: state.lastUsedId + 1,
        content: state.userInput,
        completed: false,
        date: getCurrentDateTime(),
      };
      state.lastUsedId++; // Tingkatkan lastUsedId
      Swal.fire({
        icon: "success",
        title: "Your todo has been saved",
        showConfirmButton: false,
        timer: 1700,
      });
      state.todos.push(newTodo);
      state.userInput = "";
    },

    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },

    updateTodo: (state, action) => {
      const { id, content } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        Swal.fire({
          icon: "success",
          title: "Your todo has been updated",
          showConfirmButton: false,
          timer: 1700,
        });
        todo.content = content;
        todo.date = getCurrentDateTime();
      }
    },
  },
});

export const actions = todosSlice.actions;

export default todosSlice.reducer;
