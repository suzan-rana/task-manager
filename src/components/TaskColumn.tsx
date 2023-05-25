import React, { useState } from "react";
import Task from "./Task";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import Input from "./UI/Input";

type Props = {
  columnId: string;
  handleAddNewTodo: (content: string) => void;
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  taskLists: TypeTask[];
};

export interface TypeTask {
  id: string;
  content: string;
}

const TaskColumn = ({
  columnId,
  column,
  taskLists,
  handleAddNewTodo,
}: Props) => {
  return (
    <>
      <Droppable droppableId={columnId}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <article
            className={`flex flex-col min-w-[300px] overflow-y-auto grow w-[32%] border-[2px]  transition-colors  rounded-lg   py-6 px-6 pb-16 ${
              snapshot.isDraggingOver
                ? "border-green-500 bg-zinc-900"
                : "bg-slate-800"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3 className="text-center font-bold mb-4 mt-2 text-xl capitalize">
              {column.title}
            </h3>
            {column.title === "To do" && <Input placeholder="Create new todo" cb={handleAddNewTodo} />}

            {taskLists.map((task, index) => (
              <Task
                columnId={columnId}
                key={task.id}
                task={task}
                index={index}
              />
            ))}
            {provided.placeholder}
          </article>
        )}
      </Droppable>
    </>
  );
};

export default TaskColumn;
