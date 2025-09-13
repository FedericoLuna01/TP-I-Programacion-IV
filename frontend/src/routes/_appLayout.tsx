import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const Route = createFileRoute("/_appLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
