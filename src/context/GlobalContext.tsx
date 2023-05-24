import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';


interface TypeGlobalContext {
  dataLists: TypeDataList;
  openMenuItems: TModalItems;
  handleDragEnd: (result: DropResult) => void;
  handleAddNewTodo: (content: string) => void;
  setOpenMenuItems: React.Dispatch<SetStateAction<any>>;
  handleDeleteTask: (taskId: string, columnId: string) => void;
  handleOpenMenuItems: (
    modalName: "EDIT" | "DELETE",
    taskId: string,
    columnId: string
  ) => void;
}

export type TModalItems = Record<
  "editModal" | "deleteModal",
  {
    taskId: string;
    columnId: string;
  } | null
>;
export const GlobalContext = createContext<TypeGlobalContext>(null as any);
export const useGlobalContext = () =>
  useContext(GlobalContext) as TypeGlobalContext;

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [openMenuItems, setOpenMenuItems] = useState<TModalItems>({
    editModal: null,
    deleteModal: null,
  });
  const handleOpenMenuItems = (
    modalName: "EDIT" | "DELETE",
    taskId: string,
    columnId: string
  ) => {
    if (modalName === "EDIT") {
      setOpenMenuItems((prev) => ({
        ...prev,
        editModal: {
          columnId,
          taskId,
        },
      }));
    } else {
      setOpenMenuItems((prev) => ({
        ...prev,
        deleteModal: {
          columnId,
          taskId,
        },
      }));
    }
  };

  // data lists
  const [dataLists, setDataLists] = useState<typeof initialData>(initialData);

  const handleDragEnd = (result: DropResult) => {
    if (result.destination === null || !result.destination) return;

    if (
      result.destination?.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    )
      return;

    const { destination, source, draggableId } = result;
    // handle everything now
    const startingColumn =
      dataLists.columns[source.droppableId as keyof typeof dataLists.columns];
    const finishingColumn =
      dataLists.columns[
        destination.droppableId as keyof typeof dataLists.columns
      ];
    const startingTaskIds = Array.from(startingColumn.taskIds);

    // moving in same column
    if (startingColumn.id === finishingColumn.id) {
      // REMOVE THE TASK FROM THAT POSITION
      startingTaskIds.splice(source.index, 1); // remove 1 element from that index splice(index, no. el to remove)
      startingTaskIds.splice(destination.index, 0, draggableId); // remove 0 el and add the elementId as splice(index, no. el to remove, el to add)

      // make new column with affected task ids
      const newColumn = {
        ...startingColumn,
        taskIds: startingTaskIds,
      };
      setDataLists((prev) => ({
        ...prev,
        columns: {
          ...prev["columns"],
          [newColumn.id]: newColumn,
        },
      }));
      return;
    } else {
      // moving in difference columns
      const endingTaskIds = Array.from(finishingColumn.taskIds);
      endingTaskIds.splice(destination.index, 0, draggableId);
      startingTaskIds.splice(source.index, 1);

      setDataLists((prev) => ({
        ...prev,
        columns: {
          ...prev["columns"],
          [startingColumn.id]: {
            ...startingColumn,
            taskIds: startingTaskIds,
          },
          [finishingColumn.id]: {
            ...finishingColumn,
            taskIds: endingTaskIds,
          },
        },
      }));
      return;
    }
  };

  // delete a task
  const handleDeleteTask = (taskId: string, columnId: string) => {
    console.log("TASK AND COLUMN", { taskId, columnId });
    let newTasks = Object.keys(dataLists.tasks).reduce((acc, current) => {
      if (current === taskId)
        return {
          ...acc,
        };
      return {
        ...acc,
        [current]: dataLists.tasks[current as keyof typeof dataLists.tasks],
      };
    }, {});

    let title = "";
    switch (columnId) {
      case "column-1": {
        title = "To do";
        break;
      }
      case "column-2": {
        title = "Inprogress";
        break;
      }
      case "column-3": {
        title = "Done";
        break;
      }
    }
    const newColumn = {
      [columnId]: {
        id: columnId,
        title,
        taskIds: dataLists.columns[
          columnId as keyof typeof dataLists.columns
        ].taskIds.filter((tId: string) => tId !== taskId),
      },
    };
    // sorry guys, I was not ready [SORRY FOR THE ANY'S]
    setDataLists((prev: any) => ({
      ...prev,
      tasks: newTasks,
      columns: {
        ...prev["columns"],
        ...newColumn,
      },
    }));
  };

  useEffect(() => {
    console.log("DATA LISTS", dataLists);
  }, [dataLists]);

  const handleAddNewTodo = (content: string) => {
    if (!content) return;
    let taskName = `task-${uuidv4()}`;
    let newTask = {
      [taskName]: {
        id: taskName,
        content,
      },
    };
    // @ts-ignore
    setDataLists((prev) => ({
      ...prev,
      tasks: {
        ...prev["tasks"],
        ...newTask,
      },
      columns: {
        ...prev["columns"],
        "column-1": {
          ...prev["columns"]["column-1"],
          taskIds: [...prev["columns"]["column-1"].taskIds, taskName],
        },
      },
    }));
  };

  return (
    <GlobalContext.Provider
      value={{
        setOpenMenuItems,
        openMenuItems,
        handleOpenMenuItems,
        dataLists,
        handleDragEnd,
        handleAddNewTodo,
        handleDeleteTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;

type TaskRecord = Record<
  string,
  {
    id: string;
    content: string;
  }
>;

interface TypeDataList {
  tasks: TaskRecord | {};
  columns:
    | Record<
        string,
        {
          id: string;
          title: string;
          taskIds: string[] | [];
        }
      >
    | {};
  columnOrder: string[] | [];
}

export const initialData = {
  // tasks
  tasks: {
    "task-1": { id: "task-1", content: "You can make todos with this app." },
    "task-2": { id: "task-2", content: "Work is in Progress." },
    "task-3": { id: "task-3", content: "Work is Done." },
  },
  // columns
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",

      // also look their order
      taskIds: ["task-1"],
    },
    "column-2": {
      id: "column-2",
      title: "Inprogress",

      // also look their order
      taskIds: ["task-2"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",

      // also look their order
      taskIds: ["task-3"],
    },
  },

  columnOrder: ["column-1", "column-2", "column-3"],
};
