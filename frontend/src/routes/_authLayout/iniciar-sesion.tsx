import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v3";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const formSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(1, "Contraseña requerida"),
});

type FormValues = z.infer<typeof formSchema>;

export const Route = createFileRoute("/_authLayout/iniciar-sesion")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function handleSubmit(values: FormValues) {
		// Aquí puedes manejar el envío del formulario, por ejemplo, llamar a una API
		console.log("Valores del formulario:", values);
		toast.success("Inicio de sesión exitoso");
	}

	return (
		<div className={cn("flex flex-col gap-6")}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
					<CardDescription>
						Iniciar sesión con tu correo electrónico
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-6"
						>
							<div className="grid gap-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="m@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">Contraseña</Label>
										<a
											href="#"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Olvidaste tu contraseña?
										</a>
									</div>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														type="password"
														placeholder="********"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button type="submit" className="w-full">
									Iniciar sesión
								</Button>
							</div>
							<div className="text-center text-sm">
								No tenes una cuenta?{" "}
								<Link
									to="/registrarse"
									className="underline underline-offset-4"
								>
									Registrase
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				Al hacer clic en continuar, aceptas nuestros{" "}
				<a href="#">Términos de servicio</a> y{" "}
				<a href="#">Política de privacidad</a>.
			</div>
		</div>
	);
}
