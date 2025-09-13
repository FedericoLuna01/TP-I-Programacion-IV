import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { GuideForm } from "@/components/guide-form";
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from "@/components/ui/heading";
import { getGuideById } from "@/lib/mock-data";

export const Route = createFileRoute("/_appLayout/(guias)/editar-guia/$guideId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const guide = getGuideById(params.guideId);

	if (!guide) {
		return (
			<div>
				<p>Guía no encontrada</p>
			</div>
		)
	}

	return (
		<section className="pt-20">
			<div className="container mx-auto min-h-screen">
				<Heading className="w-full mb-6">
					<HeadingTitle>Editar guía</HeadingTitle>
					<HeadingDescription>
						Actualiza y mejora tu guía de juego.
					</HeadingDescription>
				</Heading>
				<GuideForm
					initialData={guide}
					onSubmit={(values) => {
						console.log(values);
						toast.success("Guía actualizada correctamente");
					}}
				/>
			</div>
		</section>
	)
}
