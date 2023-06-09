import React, { SetStateAction, useState } from "react";
import Modal from "./Modal";
import { useGlobalContext } from "@/context/GlobalContext";

type Props = {
  taskId: string;
  columnId: string;
  taskContent: string;
  setOpenSideMenu: React.Dispatch<SetStateAction<boolean>>;
};

const SideMenu = ({ taskId, columnId, setOpenSideMenu, taskContent }: Props) => {
  const { handleOpenMenuItems } = useGlobalContext();

  return (
    <>
      <div className="absolute right-[2rem] z-50 flex flex-col py-2 px-2 bg-slate-700 rounded-md bottom-[-4rem] ">
        <p
          onClick={() => {
            handleOpenMenuItems("EDIT", taskId, columnId, taskContent);
            setOpenSideMenu(false);
          }}
          className="py-2 px-4 text-left hover:bg-slate-500 rounded-md"
        >
          Edit Task
        </p>
        <p
          onClick={() => {
            handleOpenMenuItems("DELETE", taskId, columnId, null);
            setOpenSideMenu(false);
          }}
          className="py-2 px-4 text-left hover:bg-slate-500 rounded-md"
        >
          Delete Task
        </p>
      </div>
    </>
  );
};

export default SideMenu;
