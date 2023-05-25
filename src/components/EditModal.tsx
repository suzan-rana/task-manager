import React, { useRef, useState } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { TModalItems, useGlobalContext } from "@/context/GlobalContext";
import useOnClickOutside from "@/hooks/useDetectOutsideClick";

type Props = {};

const EditModal = (props: Props) => {
  const { openMenuItems, setOpenMenuItems, handleEditTask } =
    useGlobalContext();
  const { editModal } = openMenuItems;
  const editModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(editModalRef, (e) => {
    handleCloseEditMenu();
  });
  const handleCloseEditMenu = () => {
    setOpenMenuItems((prev: TModalItems) => ({
      ...prev,
      editModal: null,
    }));
  };
  if (!editModal?.taskId || !editModal.taskContent) {
    return <></>;
  }
  const [inputValue, setInputValue] = useState(
    editModal.taskContent?.toString() || ""
  );
  return (
    <Modal>
      <div
        className="py-5 text-center px-5 min-w-[30rem] min-h-[15rem]"
        ref={editModalRef}
      >
        <h1 className="text-xl font-semibold">Edit Task</h1>
        <Input
          placeholder="Edit your todo"
          defaultValue={inputValue}
          setterFunction={setInputValue}
        />
        <div className="flex mt-12 w-[80%] mx-auto justify-between gap-6">
          <Button className="bg-slate-800" onClick={handleCloseEditMenu}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleEditTask(editModal.taskId, editModal.columnId, inputValue);
              handleCloseEditMenu();
            }}
            className="bg-green-500"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
