import {
  Link,
  Outlet,
  createRootRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { use, useEffect, useState } from "react";
import { NewBoardButton } from "../components/NewBoardButton";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate({ to: "/" });
    });
    return <div>404</div>;
  },
});

interface Subtask {
  id: string;
  description: string;
}
interface Task {
  title: string;
  id: string;
  description: string;
  subtasks: Subtask[];
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
  section: Section[];
}

interface boardData {
  id: string;
  title: string;
}

function RootComponent() {
  const [boards, setBoards] = useState<boardData[]>([]);

  useEffect(() => {
    setBoards(JSON.parse(localStorage.getItem("boards") || "[]"));
    if (!localStorage.getItem("boards")) {
      const b = boards.map((board) => {
        return { title: board.title, id: board.id };
      });
      setBoards(b);
    }
    setBoards(JSON.parse(localStorage.getItem("boards") || "[]"));
  }, []);

  return (
    <div className="flex min-h-screen ">
      <ul className="min-w-52 gap-3  items-center flex p-2 py-4 bg-secondary flex-col">
        <NewBoardButton setBoards={setBoards} />
        {boards?.map((board) => (
          <li key={board.id} className=" p-3 rounded-md  bg-gray-400 w-full">
            <Link to={"/boards/$id"} params={{ id: board.id }}>
              {board.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
