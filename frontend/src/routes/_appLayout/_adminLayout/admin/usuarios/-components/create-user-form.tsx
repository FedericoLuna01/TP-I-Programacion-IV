import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v3";
import { createUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
	email: z.string().email("Email inválido"),
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
	password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
	role: z.enum(["user", "admin"]).optional(),
});

export type CreateUserFormValues = z.infer<typeof formSchema>;

interface CreateUserFormProps {
	onSuccess?: () => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<CreateUserFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			role: "user",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data: CreateUserFormValues) => {
			createUser({
				email: data.email,
				username: data.username,
				password: data.password,
			});
		},
		onSuccess: () => {
			toast.success("Usuario creado exitosamente");
			form.reset();
			onSuccess?.();
		},
		onError: (error) => {
			toast.error("Error al crear usuario: " + error.message);
		},
	});

	function handleSubmit(values: CreateUserFormValues) {
		mutation.mutate({
			email: values.email,
			username: values.username,
			password: values.password,
			role: values.role,
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-6 px-4"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre de usuario *</FormLabel>
							<FormControl>
								<Input placeholder="usuario123" {...field} />
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
							<FormLabel>Email *</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="usuario@example.com"
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
							<FormLabel>Contraseña *</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="********"
										{...field}
									/>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
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

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rol</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Seleccionar rol..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="user">Usuario</SelectItem>
									<SelectItem value="admin">Administrador</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={mutation.isPending}>
					{mutation.isPending ? "Creando..." : "Crear Usuario"}
				</Button>
			</form>
		</Form>
	);
}
