"use client";
import TaskColumn from "@/components/TaskColumn";
import Modal from "@/components/UI/Modal";
import {
  TModalItems,
  initialData,
  useGlobalContext,
} from "@/context/GlobalContext";
import useOnClickOutside from "@/hooks/useDetectOutsideClick";
import React, { useEffect, useRef, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

type Props = {};

const Home = (props: Props) => {
  const {
    openMenuItems,
    dataLists,
    setOpenMenuItems,
    handleDragEnd,
    handleAddNewTodo,
  } = useGlobalContext();

  return (
    <main>
      {openMenuItems.deleteModal?.taskId && <DeleteModal />}
      <h1 className="text-center font-bold text-3xl capitalize mt-12 mb-8">
        Task Manager
      </h1>
      <div className="flex items-stretch min-h-[30rem] justify-between gap-12 my-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          {dataLists.columnOrder.map((columnId) => {
            const column =
              dataLists.columns[columnId as keyof typeof dataLists.columns];
            // @ts-ignore
            const taskLists = column.taskIds.map(
              (taskId: any) =>
                dataLists.tasks[taskId as keyof typeof dataLists.tasks]
            );
            return (
              <TaskColumn
                handleAddNewTodo={handleAddNewTodo}
                key={columnId}
                taskLists={taskLists}
                column={column}
                columnId={columnId}
              />
            );
          })}
        </DragDropContext>
      </div>
    </main>
  );
};

export default Home;

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
          <Button className="bg-slate-800" onClick={handleCloseDeleteMenu}>Cancel</Button>
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
