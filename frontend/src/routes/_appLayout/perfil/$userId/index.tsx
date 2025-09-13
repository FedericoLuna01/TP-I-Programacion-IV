import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile-page";
import { getUserById } from "@/lib/mock-data";

export const Route = createFileRoute("/_appLayout/perfil/$userId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const user = getUserById(params.userId);

	if (!user) {
		return (
			<div className="min-h-[53.5dvh] flex items-center justify-center">
				<h1>Usuario no encontrado</h1>
			</div>
		)
	}

	return <ProfilePage user={user} />;
}
