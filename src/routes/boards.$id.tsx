import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createPortal } from "react-dom";

const board = {
	title: "Board 1",
	id: "1",
	section: [
		{
			title: "Todo",
			id: "1",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",
					subtasks: ["subtask 1", "subtask 2"],
					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],
					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],
					status: "todo",
				},
			],
		},
		{
			title: "Doing",
			id: "2",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",
					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",
					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",

					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},
		{
			title: "Done",
			id: "3",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},

		{
			title: "Done",
			id: "3",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},

		{
			title: "Done",
			id: "3",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},

		{
			title: "Done",
			id: "3",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},

		{
			title: "Done",
			id: "3",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},
		{
			title: "Done",
			id: "3",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},
		{
			title: "Done",
			id: "3",
			tasks: [
				{
					title: "Task 1",
					id: "1",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 2",
					id: "2",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
				{
					title: "Task 3",
					id: "3",
					description: "This is a task",

					subtasks: ["subtask 1", "subtask 2"],

					status: "todo",
				},
			],
		},
	],
};

export const Route = createFileRoute("/boards/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const [showAddTask, setShowAddTask] = useState(false);
	const [taskValue, setTaskValue] = useState({
		title: "",
		description: "",
		subtasks: [""],
		status: "",
	});
	const addNewTask = () => {
		console.log("Add new task");

		setShowAddTask(!showAddTask);
	};

	const createTask = (e) => {
		e.preventDefault();
		console.log("create task");
		board.section[0].tasks.push({
			id: String(board.section[0].tasks.length + 1),
			title: taskValue.title,
			description: taskValue.description,
			subtasks: taskValue.subtasks,
			status: taskValue.status,
		});
		setShowAddTask(!showAddTask);
		console.log(board.section[0].tasks, "hi");
	};
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			{/* Top Header - Uncomment when needed */}

			<div className="flex sticky top-0  bg-yellow-500 justify-between p-4 w-full">
				<h1>{board.title}</h1>
				<button
					type="button"
					onClick={addNewTask}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
				>
					Add new task
				</button>
			</div>

			<div className="flex-1 bg-gray-300 overflow-x-scroll w-full">
				{/* Section container with enough space for all columns and padding */}
				<div className="flex gap-4 p-4 min-w-max ">
					{board.section.map((section) => (
						<div
							key={section.id}
							className="bg-gray-200 p-4 w-80 h-fit shrink-0"
						>
							<p className="font-bold mb-2">{section.title}</p>
							<ul className="space-y-2">
								{section.tasks.map((task) => (
									<li key={task.id} className="bg-white p-4 rounded shadow">
										<h2 className="font-semibold">{task.title}</h2>
										<p className="text-gray-600">{task.description}</p>
									</li>
								))}
							</ul>
							<div className="mt-4">
								<button
									type="button"
									className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
								>
									Add new task
								</button>
							</div>
						</div>
					))}
				</div>
				{showAddTask &&
					createPortal(
						<div className="fixed min-h-screen top-0 flex justify-end   bottom-0 min-w-screen right-0 left-0 bg-black/80 ">
							<div className="text-white  max-h-screen  w-1/3 overflow-y-auto m-2  shadow-2xl bg-zinc-800   p-4 rounded-2xl ">
								<h3>Add New Task</h3>
								<form onSubmit={createTask} className="space-y-4">
									<div className="flex flex-col space-y-2">
										<label htmlFor="title">title</label>
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
										<input
											placeholder="e.g Take coffe break"
											type="text"
											name="title"
											className="border border-gray-700 p-2 rounded-lg"
											onChange={(e) =>
												setTaskValue({
													...taskValue,
													subtasks: e.target.value.split(","),
												})
											}
										/>
										<button type="button"> add new subtask</button>
									</div>

									<div className="flex flex-col space-y-2">
										<label htmlFor="status">Status</label>
										<input
											placeholder="e.g Take coffe break"
											type="text"
											name="status"
											className="border border-gray-700 p-2 rounded-lg"
										/>
									</div>

									<div className="flex justify-between">
										<button type="submit">create task</button>
										<button
											type="button"
											onClick={() => setShowAddTask(!showAddTask)}
										>
											cancel
										</button>
									</div>
								</form>
							</div>
						</div>,
						document.body,
					)}
			</div>
		</div>
	);
}
