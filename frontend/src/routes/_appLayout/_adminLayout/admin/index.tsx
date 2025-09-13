import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Eye, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from "@/components/ui/heading";
import { mockGuides, mockUsers } from "@/lib/mock-data";

export const Route = createFileRoute("/_appLayout/_adminLayout/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	// Calculate statistics from mock data
	const totalGuides = mockGuides.length;
	const totalUsers = mockUsers.length;
	const totalViews = mockGuides.reduce((sum, guide) => sum + guide.views, 0);
	const averageRating =
		mockGuides.reduce((sum, guide) => sum + guide.rating, 0) / totalGuides;

	const stats = [
		{
			title: "Total de Guías",
			value: totalGuides,
			description: "Guías publicadas en la plataforma",
			icon: BookOpen,
			color: "text-blue-600",
		},
		{
			title: "Total de Usuarios",
			value: totalUsers,
			description: "Usuarios registrados",
			icon: Users,
			color: "text-green-600",
		},
		{
			title: "Vistas Totales",
			value: totalViews.toLocaleString(),
			description: "Vistas acumuladas en todas las guías",
			icon: Eye,
			color: "text-purple-600",
		},
		{
			title: "Calificación Promedio",
			value: averageRating.toFixed(1),
			description: "Rating promedio de las guías",
			icon: Star,
			color: "text-yellow-600",
		},
	];

	const adminSections = [
		{
			title: "Nuevo Juego",
			description: "Agregar un nuevo juego a la plataforma",
			path: "/admin/nuevojuego",
			icon: "🎮",
		},
		{
			title: "Usuarios",
			description: "Gestionar usuarios de la plataforma",
			path: "/admin/usuarios",
			icon: "👥",
		},
		{
			title: "Guías",
			description: "Administrar guías publicadas",
			path: "/admin/guias",
			icon: "📚",
		},
		{
			title: "Categorías",
			description: "Gestionar categorías de juegos",
			path: "/admin/categorias",
			icon: "🏷️",
		},
		{
			title: "Reportes",
			description: "Ver reportes y estadísticas detalladas",
			path: "/admin/reportes",
			icon: "📊",
		},
		{
			title: "Configuración",
			description: "Configuraciones del sistema",
			path: "/admin/configuracion",
			icon: "⚙️",
		},
	];

	return (
		<div className="space-y-8">
			<div>
				<Heading className="w-full mb-6">
					<HeadingTitle>Panel de Administración</HeadingTitle>
					<HeadingDescription>
						Bienvenido al panel de administración. Aquí puedes gestionar la
						plataforma.
					</HeadingDescription>
				</Heading>
			</div>

			{/* Statistics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.title}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									{stat.title}
								</CardTitle>
								<Icon className={`h-4 w-4 ${stat.color}`} />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stat.value}</div>
								<p className="text-xs text-muted-foreground">
									{stat.description}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Navigation Sections */}
			<div>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					Secciones de Administración
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{adminSections.map((section) => (
						<Card
							key={section.title}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex items-center space-x-2">
									<span className="text-2xl">{section.icon}</span>
									<CardTitle className="text-lg">{section.title}</CardTitle>
								</div>
								<CardDescription>{section.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<Link to={section.path}>
									<Button className="w-full">Acceder</Button>
								</Link>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Recent Activity */}
			<div>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					Actividad Reciente
				</h2>
				<Card>
					<CardHeader>
						<CardTitle>Últimas Guías Publicadas</CardTitle>
						<CardDescription>
							Guías recientemente agregadas a la plataforma
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockGuides.slice(0, 3).map((guide) => (
								<div key={guide.id} className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										<img
											src={guide.image}
											alt={guide.title}
											className="w-12 h-12 rounded-lg object-cover"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
											{guide.title}
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Por {guide.author.displayName} • {guide.views} vistas
										</p>
									</div>
									<div className="flex items-center space-x-1">
										<Star className="h-4 w-4 text-yellow-400 fill-current" />
										<span className="text-sm text-gray-600 dark:text-gray-400">
											{guide.rating}
										</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
