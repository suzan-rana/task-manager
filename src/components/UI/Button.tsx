import React from 'react'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ className, children, ...restProps }: ButtonProps) => {
  return (
    <button
      {...restProps}
      className={`py-2 grow px-3  rounded-md ${className}`}
    >
      {children}
    </button>
  );
};
export default Button