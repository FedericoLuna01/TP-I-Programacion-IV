import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { GuideForm } from "@/components/guide-form";
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from "@/components/ui/heading";

export const Route = createFileRoute("/_appLayout/(guias)/crear-guia/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<section className="pt-20">
			<div className="container mx-auto min-h-screen">
				<Heading className="w-full mb-6">
					<HeadingTitle>Crear guía</HeadingTitle>
					<HeadingDescription>
						Crea y publica tu propia guía de juego.
					</HeadingDescription>
				</Heading>
				<GuideForm
					onSubmit={(values) => {
						console.log(values);
						toast.success("Guía publicada correctamente");
					}}
				/>
			</div>
		</section>
	)
}
