import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<Outlet />
			<Footer />
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	),
});
