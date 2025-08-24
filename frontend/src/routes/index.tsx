import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getWeather } from "@/api/weather";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const query = useQuery({
		queryKey: ["weather"],
		queryFn: getWeather,
	});

	console.log(query.data);

	return (
		<div>
			<div>Hello "/"!</div>
			<div>
				{query.isLoading && <div>Cargando...</div>}
				{query.isError && <div className="text-red-500">Error en la api</div>}
				{query.data && <pre>{JSON.stringify(query.data, null, 2)}</pre>}
			</div>
		</div>
	);
}
