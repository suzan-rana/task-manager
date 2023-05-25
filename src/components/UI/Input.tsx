import { useState, SetStateAction } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  cb?: (content: string) => void;
  placeholder: string;
  defaultValue?: string;
  setterFunction?: React.Dispatch<SetStateAction<string>>; // eq. to. setInputValue from parent
}

const Input = ({
  cb,
  placeholder,
  defaultValue,
  setterFunction,
  ...restProps
}: InputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  return (
    <div className=" my-4 w-[100%] flex items-center justify-between bg-slate-700/80 rounded-md transition-colors duration-500 px-4">
      <input
        placeholder={placeholder}
        tabIndex={1}
        value={defaultValue || inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setterFunction?.(e.target.value) || setInputValue(e.target.value)
        }
        type="text"
        className="bg-transparent ring-0 py-3 w-[90%] focus:outline-none"
        {...restProps}
      />
      {cb && (
        <span
          onClick={() => {
            cb?.(inputValue);
            setInputValue("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              cb?.(inputValue);
              setInputValue("");
            }
          }}
          tabIndex={2}
          className="cursor-pointer py-1 px-3 text-gray-400 hover:bg-green-500 hover:text-white focus:text-white focus:outline-none focus:bg-green-500 hover:outline-none rounded-md "
        >
          +
        </span>
      )}
    </div>
  );
};
export default Input;
