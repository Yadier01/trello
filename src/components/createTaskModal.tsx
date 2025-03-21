import { useState } from "react";
import { Subtask } from "../routes/boards.$id";

export const CreateTaskModal = ({
  board,
  setBoard,
  id,
  setShowAddTask,
  showAddTask,
  sections,
}: any) => {
  const [subTasks, setSubTask] = useState<Subtask[]>([]);
  const [taskValue, setTaskValue] = useState({
    title: "",
    description: "",
    subtasks: [],
    status: "",
  });
  const [selectedSection, setSelectedSection] = useState(undefined);

  const handleSectionChange = (e: any) => {
    setSelectedSection(e.target.value);
  };

  const newSubtask = () => {
    setSubTask([
      ...subTasks,
      { id: String(subTasks.length + 1), description: "" },
    ]);
  };

  const createTask = (e) => {
    e.preventDefault();
    console.log(selectedSection);
    const sectionExits = board?.section?.find(
      (sec) => sec.title === selectedSection,
    );
    if (!selectedSection || !sectionExits) return;
    const newTask = {
      title: taskValue.title,
      description: taskValue.description,
      status: taskValue.status,
      id: String(board?.section?.length + 1 || "1"),
      subTasks: subTasks,
    };

    const updatedSection = board?.section?.map((section) => {
      if (section.title === selectedSection) {
        section.tasks.push(newTask);
      }
      return section;
    });

    setBoard((prev) => {
      const updatedBoard = {
        id: prev?.id || "",
        title: prev?.title || "",
        section: updatedSection,
        subtasks: subTasks,
      };
      localStorage.setItem(`boards${id}`, JSON.stringify(updatedBoard));
      return updatedBoard;
    });

    setShowAddTask(!showAddTask);
  };
  const handleSubtaskChange = (e, id) => {
    const updatedSubtask = subTasks.map((subtask) => {
      if (subtask.id === id) {
        subtask.description = e.target.value;
      }
      return subtask;
    });
    setSubTask(updatedSubtask);
  };
  return (
    <>
      createPortal(
      <div className="fixed min-h-screen top-0 flex justify-end   bottom-0 min-w-screen right-0 left-0 bg-black/80 ">
        <div className="text-white  max-h-screen space-y-4  w-1/3 overflow-y-auto m-2  shadow-2xl bg-primary p-4 rounded-2xl ">
          <h3 className="text-lg">Add New Task</h3>
          <form
            onSubmit={createTask}
            className="bg-secondary p-4  rounded-lg space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Title</label>
              <input
                placeholder="e.g Take coffe break"
                type="text"
                name="title"
                className="border border-gray-700 p-2 rounded-lg"
                onChange={(e) =>
                  setTaskValue({ ...taskValue, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Description</label>
              <textarea
                placeholder="e.g Take coffe break"
                name="title"
                className="border border-gray-700 p-2 rounded-lg"
                onChange={(e) =>
                  setTaskValue({
                    ...taskValue,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Subtasks</label>
              {subTasks.map((subtask: Subtask) => (
                <input
                  key={subtask.id}
                  placeholder="e.g Take coffe break"
                  type="text"
                  name="title"
                  className="border border-gray-700 p-2 rounded-lg"
                  onChange={(e) => handleSubtaskChange(e, subtask.id)}
                />
              ))}
              <button type="button" onClick={newSubtask}>
                add new subtask
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="status">Status</label>
              <select
                name="section"
                className="border border-gray-700 p-2 rounded-lg"
              >
                <option value="">--Please choose an option--</option>
                {sections.map((section: any) => (
                  <option
                    key={section.id}
                    value={section.title}
                    onClick={(e) => handleSectionChange(e)}
                  >
                    {section.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center py-8">
              <button
                type="submit"
                className=" rounded-lg p-3 bg-bttn hover:cursor-pointer "
              >
                Create task
              </button>
              <button
                type="button"
                onClick={() => setShowAddTask(!showAddTask)}
                className=" rounded-lg p-3 border border-zinc-700 hover:cursor-pointer "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      , document.body, )
    </>
  );
};
