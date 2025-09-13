import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appLayout/_adminLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="pt-20">
			<div className="container mx-auto">
				<Outlet />
			</div>
		</div>
	);
}
