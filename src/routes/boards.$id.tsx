import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CreateTaskModal } from "../components/createTaskModal";
import { IoClose } from "react-icons/io5";
import { Modal } from "../components/Modal";
import { AddNewSection } from "../components/AddNewSection";

export interface Subtask {
  id: string;
  description: string;
}
interface Task {
  title: string;
  id: string;
  description: string;
  subTasks: Subtask[];
  status: string;
}

interface Section {
  title: string;
  id: string;
  tasks: Task[]; // Updated from `task` to `tasks`
}

interface Board {
  title: string;
  id: string;
  section?: Section[];
}

export const Route = createFileRoute("/boards/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [showAddTask, setShowAddTask] = useState(false);
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [taskInfo, setTaskInfo] = useState<Task | undefined>(undefined);
  const [sections, setSections] = useState([{ title: "", id: "" }]);

  const navigate = useNavigate({ from: "/boards/$id" });
  const addNewTask = () => {
    setShowAddTask(!showAddTask);
  };

  useEffect(() => {
    //boards only contains the id and title of the board

    const boards = JSON.parse(localStorage.getItem("boards") || "[]");
    const b = boards.find((board) => board.id === id);
    if (!b) {
      navigate({ to: "/" });
      return;
    }

    //boards$id all  contains the data of the board
    const boardStorage = JSON.parse(
      localStorage.getItem(`boards${id}`) || "[]",
    );

    setBoard(() => {
      const board = {
        title: b.title,
        id: b.id,
        tasks: [],
        section: boardStorage.section,
      };

      return board;
    });
    if (!boardStorage.section) {
      return;
    }
  }, [id]);

  const showTaskInfoHandler = (task: Task) => {
    setTaskInfo(task);
    setShowTaskInfo(!showTaskInfo);
  };
  return (
    <div className="flex  bg-background flex-col h-screen w-screen overflow-hidden">
      {/* top header */}
      <div className="flex sticky top-0 max-w-screen bg-secondary items-center justify-between p-4 w-full">
        <h1 className="text-white text-xl font-semibold">{board?.title}</h1>
        <button
          type="button"
          onClick={addNewTask}
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
        >
          Add new task
        </button>
      </div>

      <div className="flex-1 bg-primary overflow-x-scroll w-full">
        {/* Section container with enough space for all columns and padding */}
        <div className="flex gap-4 p-4 min-w-max ">
          {board?.section?.map((section) => (
            <>
              <div
                key={section.id}
                className="bg-gray-800 p-4 w-80 h-fit rounded-lg shrink-0"
              >
                <p className="font-bold text-white text-lg mb-2">
                  {section.title}
                </p>
                <ul className="space-y-2">
                  {section.tasks.map((task) => (
                    <li
                      key={task.id}
                      onClick={() => showTaskInfoHandler(task)}
                      className="bg-white hover:cursor-pointer p-4 rounded shadow"
                    >
                      <h2 className="font-semibold">{task.title}</h2>
                      <p className="text-gray-600">{task.description}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  {/* en el future coger el section automaticamente */}
                  <button
                    type="button"
                    className="bg-blue-500 w-full  hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                    onClick={addNewTask}
                  >
                    Add new task
                  </button>
                </div>
              </div>
            </>
          ))}

          <AddNewSection
            setBoard={setBoard}
            setSections={setSections}
            id={id}
          />
        </div>

        {showTaskInfo && (
          <Modal>
            <div className="bg-secondary space-y-4 min-h-80 max-w-1/3 min-w-sm p-4 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between">
                <p className="text-2xl ">{taskInfo?.title}</p>
                <button onClick={() => setShowTaskInfo(false)}>
                  <IoClose size={20} />
                </button>
              </div>
              <div className="w-full  border-t border-gray-600"></div>
              <div>
                <p className="text-xl">{taskInfo?.description}</p>
              </div>
              <div className="space-y-1">
                <div className="space-y-1">
                  {taskInfo?.subTasks?.map((subtask) => (
                    <p key={subtask.id}>{subtask.description}</p>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
        {showAddTask && (
          <CreateTaskModal
            id={id}
            sections={sections}
            board={board}
            setBoard={setBoard}
            setShowAddTask={setShowAddTask}
            showAddTask={showAddTask}
          />
        )}
      </div>
    </div>
  );
}
