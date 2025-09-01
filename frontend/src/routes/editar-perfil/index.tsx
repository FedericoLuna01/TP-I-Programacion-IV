import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v3";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUserById, gradients } from "@/lib/mock-data";

export const Route = createFileRoute("/editar-perfil/")({
	component: RouteComponent,
});

const formSchema = z.object({
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.max(30, "El nombre de usuario no puede exceder los 30 caracteres"),
	displayName: z
		.string()
		.min(3, "El nombre debe tener al menos 3 caracteres")
		.max(50, "El nombre no puede exceder los 50 caracteres"),
	bio: z
		.string()
		.max(500, "La biografía no puede exceder los 500 caracteres")
		.optional(),
	avatar: z.string().optional(),
	banner: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
	// En un caso real, obtendríamos el usuario actual desde un contexto de autenticación
	const mockUserId = "user-1";
	const currentUser = getUserById(mockUserId);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: currentUser?.username || "",
			displayName: currentUser?.displayName || "",
			bio: currentUser?.bio || "",
			avatar: currentUser?.avatar || "",
			banner: currentUser?.banner || "",
		},
	});

	const { watch, setValue } = form;
	const formValues = watch();

	function onSubmit(values: FormValues) {
		console.log(values);
		toast.success("Perfil actualizado correctamente");
	}

	const handleAvatarUpload = () => {
		// Simular subida de imagen
		toast.success("Avatar subido correctamente");
		setValue("avatar", "https://i.pravatar.cc/150?u=" + Date.now());
	};

	const handleBannerSelect = (gradient: string) => {
		setValue("banner", gradient);
		toast.success("Banner actualizado");
	};

	return (
		<section className="pt-20">
			<div className="container mx-auto min-h-screen">
				<Heading className="w-full">
					<HeadingTitle>Editar Perfil</HeadingTitle>
					<HeadingDescription>
						Personaliza tu perfil y cómo te ven otros usuarios.
					</HeadingDescription>
				</Heading>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
					{/* Formulario Principal */}
					<div className="lg:col-span-2 space-y-6">
						<Card className="bg-gradient-card border-border/50">
							<CardHeader>
								<CardTitle>Información del Perfil</CardTitle>
							</CardHeader>
							<CardContent>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-6"
									>
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nombre de Usuario *</FormLabel>
													<FormControl>
														<Input
															placeholder="Ej: gamerPro123"
															className="bg-background/50"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="displayName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nombre para Mostrar *</FormLabel>
													<FormControl>
														<Input
															placeholder="Ej: Juan Pérez"
															className="bg-background/50"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="bio"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Biografía</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Cuéntanos sobre ti..."
															className="bg-background/50"
															rows={4}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<Button type="submit">Guardar Cambios</Button>
									</form>
								</Form>
							</CardContent>
						</Card>
					</div>

					{/* Barra Lateral */}
					<div className="space-y-6">
						{/* Avatar */}
						<Card className="bg-gradient-card border-border/50">
							<CardHeader>
								<CardTitle>Avatar</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{formValues.avatar ? (
										<div className="space-y-4">
											<img
												src={formValues.avatar}
												alt="Avatar"
												className="w-32 h-32 rounded-full mx-auto object-cover"
											/>
											<Button
												variant="outline"
												size="sm"
												className="w-full"
												onClick={handleAvatarUpload}
											>
												<UploadIcon className="h-4 w-4 mr-2" />
												Cambiar Avatar
											</Button>
										</div>
									) : (
										<div className="space-y-4">
											<div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
												<UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
												<p className="text-sm text-muted-foreground mb-4">
													Sube una imagen para tu avatar
												</p>
												<Button
													variant="outline"
													size="sm"
													onClick={handleAvatarUpload}
												>
													Subir Avatar
												</Button>
											</div>
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Banner */}
						<Card className="bg-gradient-card border-border/50">
							<CardHeader>
								<CardTitle>Banner</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-2">
										{gradients.map((gradient, index) => (
											<button
												key={index}
												type="button"
												className={`h-16 rounded-lg transition-all ${gradient} ${
													formValues.banner === gradient
														? "ring-2 ring-primary"
														: ""
												}`}
												onClick={() => handleBannerSelect(gradient)}
											/>
										))}
									</div>
									<p className="text-sm text-muted-foreground text-center">
										Selecciona un gradiente para tu banner
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
