import React, { useState } from "react";
import Modal from "./Modal";
import { useGlobalContext } from "@/context/GlobalContext";

type Props = {
  taskId: string;
};

const SideMenu = ({ taskId }: Props) => {
  const { handleOpenMenuItems } = useGlobalContext();

  return (
    <>
      <div className="absolute right-[2rem] z-50 flex flex-col py-2 px-2 bg-slate-700 rounded-md bottom-[-4rem] ">
        <p
          onClick={() => handleOpenMenuItems("EDIT", taskId)}
          className="py-2 px-4 text-left hover:bg-slate-500 rounded-md"
        >
          Edit Task
        </p>
        <p
          onClick={() => handleOpenMenuItems("DELETE", taskId)}
          className="py-2 px-4 text-left hover:bg-slate-500 rounded-md"
        >
          Delete Task
        </p>
      </div>
    </>
  );
};

export default SideMenu;
