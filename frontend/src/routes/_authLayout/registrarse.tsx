import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v3";
import { createUser } from "@/api/user";
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
import { cn } from "@/lib/utils";

const formSchema = z
	.object({
		email: z.string().email("Email inválido"),
		username: z
			.string()
			.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
		password: z
			.string()
			.min(6, "La contraseña debe tener al menos 6 caracteres"),
		repeatPassword: z.string(),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Las contraseñas no coinciden",
		path: ["repeatPassword"],
	});

type FormValues = z.infer<typeof formSchema>;

export const Route = createFileRoute("/_authLayout/registrarse")({
	component: RouteComponent,
});

function RouteComponent() {
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			repeatPassword: "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data: FormValues) => {
			createUser({
				email: data.email,
				username: data.username,
				password: data.password,
			});
		},
	});

	function handleSubmit(values: FormValues) {
		console.log("Valores del formulario:", values);
		mutation.mutate(values);

		if (mutation.isError) {
			return toast.error("Error al registrarse");
		}

		toast.success("Registro exitoso");
	}

	return (
		<div className={cn("flex flex-col gap-6")}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Crear cuenta</CardTitle>
					<CardDescription>
						Regístrate con tu correo electrónico
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
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre de usuario</FormLabel>
											<FormControl>
												<Input placeholder="Tu nombre de usuario" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contraseña</FormLabel>
											<FormControl>
												<Input
													placeholder="********"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="repeatPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Repetir contraseña</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														type={showRepeatPassword ? "text" : "password"}
														placeholder="********"
														{...field}
													/>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
														onClick={() =>
															setShowRepeatPassword(!showRepeatPassword)
														}
													>
														{showRepeatPassword ? (
															<EyeOffIcon className="h-4 w-4" />
														) : (
															<EyeIcon className="h-4 w-4" />
														)}
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Registrarse
								</Button>
							</div>
							<div className="text-center text-sm">
								Ya tenes una cuenta?{" "}
								<Link
									to="/iniciar-sesion"
									className="underline underline-offset-4"
								>
									Iniciar sesión
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
