import { TModalItems, useGlobalContext } from "@/context/GlobalContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import React, { useRef } from "react";
import useOnClickOutside from "@/hooks/useDetectOutsideClick";

const DeleteModal = () => {
  const { setOpenMenuItems, openMenuItems, handleDeleteTask } =
    useGlobalContext();
  const deleteModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(deleteModalRef, (e) => {
    handleCloseDeleteMenu();
  });
  const handleCloseDeleteMenu = () => {
    setOpenMenuItems((prev: TModalItems) => ({
      ...prev,
      deleteModal: null,
    }));
  };
  const { deleteModal } = openMenuItems;
  if (!deleteModal?.columnId || !deleteModal?.taskId) {
    return <></>;
  }
  return (
    <Modal>
      <div
        className="py-5 text-center px-5 min-w-[30rem] min-h-[18rem]"
        ref={deleteModalRef}
      >
        <h1 className="text-xl font-semibold">Delete Task</h1>
        <p className="py-12 text-lg">
          Are you sure you want to delete this task?
        </p>
        <div className="flex w-[80%] mx-auto justify-between gap-6">
          <Button className="bg-slate-800" onClick={handleCloseDeleteMenu}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteTask(deleteModal?.taskId, deleteModal?.columnId);
              handleCloseDeleteMenu();
            }}
            className="bg-red-500"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteModal