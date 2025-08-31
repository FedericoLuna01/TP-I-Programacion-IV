import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v3";
import RichTextEditor from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/crear-guia/")({
	component: RouteComponent,
});

const formSchema = z.object({
	title: z
		.string()
		.min(3, "El título debe tener al menos 3 caracteres")
		.max(100, "El título no puede exceder los 100 caracteres"),
	game: z.string().min(2, "El nombre del juego es requerido"),
	summary: z.string().optional(),
	difficulty: z.enum(["Fácil", "Medio", "Difícil"]).optional(),
	tags: z.string().optional(),
	content: z.string().min(1, "El contenido de la guía es requerido"),
	coverImage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function RouteComponent() {
	const [isPreview, setIsPreview] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			game: "",
			summary: "",
			difficulty: undefined,
			tags: "",
			content: "",
			coverImage: "",
		},
	});

	const { watch, setValue } = form;
	const formValues = watch();
	const tags =
		formValues.tags
			?.split(",")
			.map((tag) => tag.trim())
			.filter(Boolean) ?? [];

	function onSubmit(values: FormValues) {
		if (!values.title || !values.game || !values.content) {
			toast.error("Por favor completa los campos obligatorios");
			return;
		}
		console.log(values);
		toast.success("Guía publicada correctamente");
	}

	const handleImageUpload = () => {
		// Simular subida de imagen
		toast.success("Imagen subida correctamente");
		setValue("coverImage", "/api/placeholder/640/360");
	};

	return (
		<section className="pt-20">
			<div className="container mx-auto min-h-screen">
				<div className="flex w-full justify-between">
					<Heading className="w-full">
						<HeadingTitle>Crear guía</HeadingTitle>
						<HeadingDescription>
							Crea y publica tu propia guía de juego.
						</HeadingDescription>
					</Heading>
					<div className="flex gap-2">
						<Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
							{isPreview ? "Volver a Editar" : "Vista Previa"}
						</Button>
					</div>
				</div>
				<div>
					{isPreview ? (
						/* Preview Mode */
						<div className="space-y-6">
							<Card className="bg-gradient-card border-border/50">
								<CardContent className="p-8">
									<div className="space-y-6">
										{formValues.coverImage && (
											<img
												src={formValues.coverImage}
												alt="Cover"
												className="w-full h-64 object-cover rounded-lg"
											/>
										)}

										<div className="space-y-4">
											<div className="flex items-center gap-2">
												<Badge variant="secondary">{formValues.game}</Badge>
												{formValues.difficulty && (
													<Badge variant="outline">
														{formValues.difficulty}
													</Badge>
												)}
											</div>

											<h1 className="text-4xl font-bold">
												{formValues.title || "Título de la guía"}
											</h1>

											<p className="text-xl text-muted-foreground">
												{formValues.summary || "Resumen de la guía..."}
											</p>

											{tags.length > 0 && (
												<div className="flex flex-wrap gap-2">
													{tags.map((tag, index) => (
														<Badge key={index} variant="secondary">
															{tag}
														</Badge>
													))}
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-gradient-card border-border/50">
								<CardContent className="p-8">
									<div
										className="prose prose-invert max-w-none tiptap"
										// biome-ignore lint/security/noDangerouslySetInnerHtml: <there's no other way>
										dangerouslySetInnerHTML={{
											__html:
												formValues.content ||
												"<p>El contenido de tu guía aparecerá aquí...</p>",
										}}
									/>
								</CardContent>
							</Card>
						</div>
					) : (
						/* Edit Mode */
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{/* Main Form */}
							<div className="lg:col-span-2 space-y-6">
								{/* Basic Info */}
								<Card className="bg-gradient-card border-border/50">
									<CardHeader>
										<CardTitle>Información Básica</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<Form {...form}>
											<form
												onSubmit={form.handleSubmit(onSubmit)}
												className="space-y-8"
											>
												<FormField
													control={form.control}
													name="title"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Título de la Guía *</FormLabel>
															<FormControl>
																<Input
																	placeholder="Ej: Guía Completa para Principiantes..."
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
													name="game"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Nombre del Juego *</FormLabel>
															<FormControl>
																<Input
																	placeholder="Ej: The Legend of Zelda: Breath of the Wild"
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
													name="summary"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Resumen</FormLabel>
															<FormControl>
																<Textarea
																	placeholder="Breve descripción de lo que cubre tu guía..."
																	className="bg-background/50"
																	rows={3}
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={form.control}
														name="difficulty"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Dificultad</FormLabel>
																<Select
																	onValueChange={field.onChange}
																	value={field.value}
																>
																	<FormControl>
																		<SelectTrigger className="bg-background/50">
																			<SelectValue placeholder="Seleccionar..." />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectItem value="Fácil">Fácil</SelectItem>
																		<SelectItem value="Medio">Medio</SelectItem>
																		<SelectItem value="Difícil">
																			Difícil
																		</SelectItem>
																	</SelectContent>
																</Select>
																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={form.control}
														name="tags"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Etiquetas</FormLabel>
																<FormControl>
																	<Input
																		placeholder="puzzles, jefes, secretos (separadas por comas)"
																		className="bg-background/50"
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
												{/* Content Editor */}
												<Card className="bg-gradient-card border-border/50">
													<CardHeader>
														<CardTitle>Contenido de la Guía *</CardTitle>
													</CardHeader>
													<CardContent>
														<FormField
															control={form.control}
															name="content"
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<RichTextEditor
																			content={field.value}
																			onChange={field.onChange}
																			placeholder="Escribe tu guía aquí... Puedes usar formato rico, agregar imágenes y videos."
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</CardContent>
												</Card>
												<Button type="submit">Submit</Button>
											</form>
										</Form>
									</CardContent>
								</Card>
							</div>

							{/* Sidebar */}
							<div className="space-y-6">
								{/* Cover Image */}
								<Card className="bg-gradient-card border-border/50">
									<CardHeader>
										<CardTitle>Imagen de Portada</CardTitle>
									</CardHeader>
									<CardContent>
										{formValues.coverImage ? (
											<div className="space-y-4">
												<img
													src={formValues.coverImage}
													alt="Cover"
													className="w-full h-32 object-cover rounded-lg"
												/>
												<Button
													variant="outline"
													size="sm"
													className="w-full"
													onClick={handleImageUpload}
												>
													<UploadIcon className="h-4 w-4 mr-2" />
													Cambiar Imagen
												</Button>
											</div>
										) : (
											<div className="space-y-4">
												<div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
													<UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
													<p className="text-sm text-muted-foreground mb-4">
														Sube una imagen atractiva para tu guía
													</p>
													<Button
														variant="outline"
														size="sm"
														onClick={handleImageUpload}
													>
														Subir Imagen
													</Button>
												</div>
											</div>
										)}
									</CardContent>
								</Card>

								{/* Tips */}
								<Card className="bg-gradient-card border-border/50">
									<CardHeader>
										<CardTitle>Tips para una Buena Guía</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3 text-sm">
										<div className="flex gap-2">
											<div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
											<p>
												Usa títulos y subtítulos para organizar el contenido
											</p>
										</div>
										<div className="flex gap-2">
											<div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
											<p>Agrega imágenes para ilustrar pasos complicados</p>
										</div>
										<div className="flex gap-2">
											<div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
											<p>
												Incluye videos de YouTube para explicaciones detalladas
											</p>
										</div>
										<div className="flex gap-2">
											<div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
											<p>Usa listas para enumerar pasos o elementos</p>
										</div>
									</CardContent>
								</Card>

								{/* Preview Tags */}
								{tags.length > 0 && (
									<Card className="bg-gradient-card border-border/50">
										<CardHeader>
											<CardTitle>Etiquetas</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="flex flex-wrap gap-2">
												{tags.map((tag, index) => (
													<Badge key={index} variant="secondary">
														{tag}
													</Badge>
												))}
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
