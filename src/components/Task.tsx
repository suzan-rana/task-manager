import React, { MouseEventHandler, useRef, useState } from "react";
import { TypeTask } from "./TaskColumn";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import SideMenu from "./UI/SideMenu";
import useOnClickOutside from "@/hooks/useDetectOutsideClick";
import Modal from "./UI/Modal";

type Props = {
  task: TypeTask;
  index: number;
  columnId: string;
};

const Task = ({ task, index, columnId }: Props) => {
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const handleMenuClick = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    taskId: string
  ) => {
    e?.stopPropagation?.();
    setOpenSideMenu((prev) => !prev);
  };

  const sideMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sideMenuRef, (e) => {
    setOpenSideMenu((prev) => !prev);
  });
  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const transformedStyles = {
            ...provided.draggableProps.style,
          };
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`px-4 relative py-3 my-4 flex items-center justify-between  rounded-md transition-colors duration-500 ${
                snapshot.isDragging ? "bg-green-600 text-black" : "bg-zinc-900"
              } `}
              style={transformedStyles}
            >
              {task.content}
              <BsThreeDotsVertical
                onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
                  handleMenuClick(e, task.id);
                }}
              />
              {openSideMenu && (
                <div ref={sideMenuRef}>
                  <SideMenu
                    taskContent={task.content}
                    setOpenSideMenu={setOpenSideMenu}
                    columnId={columnId}
                    taskId={task.id}
                  />
                </div>
              )}
            </div>
          );
        }}
      </Draggable>
    </>
  );
};

export default Task;
