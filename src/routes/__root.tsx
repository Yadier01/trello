import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: RootComponent,
});

const boards = [
	{
		id: "1",
		title: "Board 1",
	},
	{
		id: "2",
		title: "Board 2",
	},
	{
		id: "3",
		title: "Board 3",
	},
];
function RootComponent() {
	return (
		<div className="flex ">
			<ul className="min-w-52 gap-2  items-center flex flex-col">
				{boards.map((board) => (
					<li key={board.id} className=" p-3 bg-red-500 w-full">
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
