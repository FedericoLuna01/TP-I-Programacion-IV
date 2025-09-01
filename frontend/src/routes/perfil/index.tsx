import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile-page";
import { getUserById } from "@/lib/mock-data";

export const Route = createFileRoute("/perfil/")({
	component: RouteComponent,
});

function RouteComponent() {
	// TODO: Traer user desde cookies
	const user = getUserById("user-1");

	if (!user) {
		return (
			<div>
				<h1>Usuario no encontrado</h1>
			</div>
		);
	}

	return <ProfilePage user={user} isOwner={true} />;
}
