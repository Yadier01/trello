import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full bg-primary text-xl flex items-center  justify-center text-white">
      Please select or create a board
    </div>
  );
}
