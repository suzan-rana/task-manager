import { useState } from "react";

const Input = ({
    handleAddNewTodo,
  }: {
    handleAddNewTodo: (content: string) => void;
  }) => {
    const [inputValue, setInputValue] = useState("");
    return (
      <div className=" my-4 w-[100%] flex items-center justify-between bg-slate-700/80 rounded-md transition-colors duration-500 px-4">
        <input
          placeholder="Create new todo"
          tabIndex={1}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          type="text"
          className="bg-transparent ring-0 py-3  focus:outline-none"
          name="newtodo"
        />
        <span
          onClick={() => {
            handleAddNewTodo(inputValue);
            setInputValue("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddNewTodo(inputValue);
              setInputValue("");
            }
          }}
          tabIndex={2}
          className="cursor-pointer py-1 px-3 text-gray-400 hover:bg-green-500 hover:text-white focus:text-white focus:outline-none focus:bg-green-500 hover:outline-none rounded-md "
        >
          +
        </span>
      </div>
    );
  };
  export default Input