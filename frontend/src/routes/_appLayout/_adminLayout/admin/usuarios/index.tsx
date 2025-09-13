import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from "@/components/ui/heading";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
// import { useQuery } from "@tanstack/react-query";
// import { getAllUsers } from "@/api/user";
import type { User } from "@/lib/mock-data";
import { mockUsers } from "@/lib/mock-data";
import { CreateUserForm } from "@/routes/_appLayout/_adminLayout/admin/usuarios/-components/create-user-form";
import { EditUserForm } from "@/routes/_appLayout/_adminLayout/admin/usuarios/-components/edit-user-form";
import { UsersDataTable } from "@/routes/_appLayout/_adminLayout/admin/usuarios/-components/users-data-table";

export const Route = createFileRoute(
	"/_appLayout/_adminLayout/admin/usuarios/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
	const [isEditUserOpen, setIsEditUserOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [users, setUsers] = useState(mockUsers);

	// TODO: Replace with API call when backend is ready
	// const { data: users, isLoading, error } = useQuery({
	//   queryKey: ["users"],
	//   queryFn: getAllUsers,
	// });

	// For now, using mock data
	// const users = mockUsers;

	// if (isLoading) return <div>Cargando usuarios...</div>;
	// if (error) return <div>Error al cargar usuarios</div>;

	const handleCreateUserSuccess = () => {
		setIsCreateUserOpen(false);
		// TODO: Refresh users list when API is ready
		// queryClient.invalidateQueries({ queryKey: ["users"] });
	};

	const handleDeleteUser = (userId: string) => {
		setUsers(users.filter((user) => user.id !== userId));
	};

	const handleEditUser = (user: User) => {
		setSelectedUser(user);
		setIsEditUserOpen(true);
	};

	const handleEditUserSuccess = () => {
		setIsEditUserOpen(false);
		setSelectedUser(null);
		// TODO: Refresh users list when API is ready
		// queryClient.invalidateQueries({ queryKey: ["users"] });
	};

	return (
		<div className="container mx-auto">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-start gap-4 flex-col w-full">
					<Button variant="outline" size="sm" asChild>
						<Link to="/admin">
							<ArrowLeftIcon className="h-4 w-4 mr-2" />
							Volver al Panel
						</Link>
					</Button>
					<Heading className="w-full">
						<HeadingTitle>Gestión de Usuarios</HeadingTitle>
						<HeadingDescription>
							Administra los usuarios registrados en la plataforma
						</HeadingDescription>
					</Heading>
				</div>

				<Sheet open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
					<SheetTrigger asChild>
						<Button>
							<PlusIcon className="h-4 w-4 mr-2" />
							Crear Usuario
						</Button>
					</SheetTrigger>
					<SheetContent className="sm:max-w-md">
						<SheetHeader>
							<SheetTitle>Crear Nuevo Usuario</SheetTitle>
							<SheetDescription>
								Completa los datos para crear un nuevo usuario en el sistema.
							</SheetDescription>
						</SheetHeader>
						<CreateUserForm onSuccess={handleCreateUserSuccess} />
					</SheetContent>
				</Sheet>

				<Sheet open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
					<SheetContent className="sm:max-w-md">
						<SheetHeader>
							<SheetTitle>Editar Usuario</SheetTitle>
							<SheetDescription>
								Modifica los datos del usuario seleccionado.
							</SheetDescription>
						</SheetHeader>
						{selectedUser && (
							<EditUserForm
								user={selectedUser}
								onSuccess={handleEditUserSuccess}
							/>
						)}
					</SheetContent>
				</Sheet>
			</div>

			<UsersDataTable
				data={users}
				onDelete={handleDeleteUser}
				onEdit={handleEditUser}
			/>
		</div>
	);
}
