import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getWeather } from "@/api/weather";

export const Route = createFileRoute("/api")({
	component: RouteComponent,
});

function RouteComponent() {
	const query = useQuery({
		queryKey: ["weather"],
		queryFn: getWeather,
	});

	console.log(query.data);
	return (
		<div className="min-h-[calc(100vh-4.05rem)] flex flex-col items-center justify-center container mx-auto p-4">
			<h1 className="text-4xl font-bold">Hello "/"!</h1>
			<div>
				{query.isLoading && <div>Cargando...</div>}
				{query.isError && <div className="text-red-500">Error en la api</div>}
				{query.data && <pre>{JSON.stringify(query.data, null, 2)}</pre>}
			</div>
		</div>
	);
}
