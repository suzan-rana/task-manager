import React, { useEffect } from "react";

interface ModalProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Overlay = ({ children, ...restProps }: ModalProps) => {
  return (
    <div
      className="fixed top-0 z-50 left-0 right-0 bottom-0 bg-black/80 "
      {...restProps}
    >
      <div className="fixed inset-0  flex items-center justify-center ">
        {children}
      </div>
    </div>
  );
};

const Modal = ({ children, ...restProps }: ModalProps) => {

  return (
    <Overlay>
      <div className="bg-slate-900 rounded-lg z-100">
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;
