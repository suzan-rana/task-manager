"use client";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/EditModal";
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
      {openMenuItems.editModal?.taskId && <EditModal />}
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




