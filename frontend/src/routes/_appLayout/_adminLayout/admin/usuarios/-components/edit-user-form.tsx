import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v3";
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
import type { User } from "@/lib/mock-data";

const formSchema = z.object({
	username: z
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
	role: z.enum(["user", "admin"]),
});

export type EditUserFormValues = z.infer<typeof formSchema>;

interface EditUserFormProps {
	user: User;
	onSuccess?: () => void;
}

export function EditUserForm({ user, onSuccess }: EditUserFormProps) {
	const form = useForm<EditUserFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: user.username,
			role: "user", // Default role since User interface doesn't have role
		},
	});

	const mutation = useMutation({
		mutationFn: async (data: EditUserFormValues) => {
			// TODO: Replace with actual API call when backend is ready
			// For now, simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Simulate updateUser call
			console.log("Updating user:", user.id, data);
		},
		onSuccess: () => {
			toast.success("Usuario actualizado exitosamente");
			onSuccess?.();
		},
		onError: (error) => {
			toast.error("Error al actualizar usuario: " + error.message);
		},
	});

	function handleSubmit(values: EditUserFormValues) {
		mutation.mutate(values);
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
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rol *</FormLabel>
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
					{mutation.isPending ? "Actualizando..." : "Actualizar Usuario"}
				</Button>
			</form>
		</Form>
	);
}
