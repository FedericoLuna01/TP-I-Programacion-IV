import { createFileRoute, Link } from "@tanstack/react-router";
import {
	BookOpen,
	Calendar,
	Edit,
	Heart,
	MapPin,
	MessageSquare,
	Star,
	Trophy,
	Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GuideCard } from "@/components/ui/guide-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGuidesByUserId, getUserById } from "@/lib/mock-data";

export const Route = createFileRoute("/perfil/")({
	component: RouteComponent,
});

function RouteComponent() {
	// TODO: Traer user desde cookies
	const user = getUserById("user-1");

	const userGuides = getGuidesByUserId(user?.id || "");

	if (!user) {
		return (
			<div>
				<h1>Usuario no encontrado</h1>
			</div>
		);
	}

	return (
		<div className="py-20">
			<main className="container mx-auto">
				{/* Profile Header */}
				<div className="relative mb-8">
					{/* Cover Image */}
					<div className="h-48 md:h-64 bg-gradient-to-r from-primary-500 to-rose-500 rounded-2xl mb-6" />

					{/* Profile Info */}
					<div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 relative z-10">
						<Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
							<AvatarImage src={user.avatar} />
							<AvatarFallback className="bg-primary/20 text-2xl md:text-3xl">
								{user.displayName.charAt(0)}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1 space-y-4">
							<div className="space-y-2">
								<h1 className="text-3xl md:text-4xl font-bold">
									{user.displayName}
								</h1>
								<p className="text-muted-foreground text-lg">
									@{user.username}
								</p>
								{user.bio && (
									<p className="text-foreground max-w-2xl">{user.bio}</p>
								)}
							</div>

							<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>
										Se unió en{" "}
										{new Date(user.joinedAt).toLocaleDateString("es-ES", {
											month: "long",
											year: "numeric",
										})}
									</span>
								</div>
								{/* Mock location */}
								<div className="flex items-center gap-1">
									<MapPin className="h-4 w-4" />
									<span>Madrid, España</span>
								</div>
							</div>
						</div>

						<div className="flex gap-2">
							<Button variant="outline">
								<Heart className="h-4 w-4 mr-2" />
								Seguir
							</Button>
							<Button variant="outline">
								<MessageSquare className="h-4 w-4 mr-2" />
								Mensaje
							</Button>
							<Button variant="outline">
								<Edit className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<Card className="bg-gradient-card border-border/50">
						<CardContent className="p-6 text-center">
							<div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mx-auto mb-2">
								<BookOpen className="h-6 w-6 text-primary" />
							</div>
							<div className="font-bold text-2xl">{user.guidesCreated}</div>
							<div className="text-sm text-muted-foreground">Guías Creadas</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-card border-border/50">
						<CardContent className="p-6 text-center">
							<div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full mx-auto mb-2">
								<Star className="h-6 w-6 text-yellow-500" />
							</div>
							<div className="font-bold text-2xl">{user.totalRating}</div>
							<div className="text-sm text-muted-foreground">
								Rating Promedio
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-card border-border/50">
						<CardContent className="p-6 text-center">
							<div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mx-auto mb-2">
								<Trophy className="h-6 w-6 text-accent" />
							</div>
							<div className="font-bold text-2xl">12</div>
							<div className="text-sm text-muted-foreground">Logros</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-card border-border/50">
						<CardContent className="p-6 text-center">
							<div className="flex items-center justify-center w-12 h-12 bg-success/20 rounded-full mx-auto mb-2">
								<Users className="h-6 w-6 text-success" />
							</div>
							<div className="font-bold text-2xl">1.2K</div>
							<div className="text-sm text-muted-foreground">Seguidores</div>
						</CardContent>
					</Card>
				</div>

				{/* Content Tabs */}
				<Tabs defaultValue="guides" className="space-y-6">
					<TabsList className="grid w-full grid-cols-4 lg:w-96">
						<TabsTrigger value="guides">Guías</TabsTrigger>
						<TabsTrigger value="favorites">Favoritos</TabsTrigger>
						<TabsTrigger value="comments">Comentarios</TabsTrigger>
						<TabsTrigger value="achievements">Logros</TabsTrigger>
					</TabsList>

					<TabsContent value="guides" className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">
								Guías Publicadas ({user.guidesCreated})
							</h2>
							<Button variant="outline">Ordenar por fecha</Button>
						</div>

						{userGuides.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{userGuides.map((guide) => (
									<GuideCard key={guide.id} guide={guide} showAuthor={false} />
								))}
							</div>
						) : (
							<Card className="bg-gradient-card border-border/50">
								<CardContent className="p-12 text-center">
									<BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
									<h3 className="text-xl font-semibold mb-2">
										Aún no hay guías
									</h3>
									<p className="text-muted-foreground mb-4">
										Este usuario aún no ha publicado ninguna guía.
									</p>
								</CardContent>
							</Card>
						)}
					</TabsContent>

					<TabsContent value="favorites" className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Guías Favoritas</h2>
						</div>

						<Card className="bg-gradient-card border-border/50">
							<CardContent className="p-12 text-center">
								<Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
								<h3 className="text-xl font-semibold mb-2">
									Sin favoritos públicos
								</h3>
								<p className="text-muted-foreground">
									Las guías favoritas de este usuario son privadas.
								</p>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="comments" className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Comentarios Recientes</h2>
						</div>

						<div className="space-y-4">
							{/* Mock recent comments */}
							<Card className="bg-gradient-card border-border/50">
								<CardContent className="p-6">
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<span className="text-sm text-muted-foreground">
												Comentó en
											</span>
											<Link
												to="/guias/$guideId"
												params={{ guideId: "guide-1" }}
												className="text-primary hover:underline font-medium"
											>
												Guía Completa: Los Secretos del Reino Élfico
											</Link>
											<span className="text-sm text-muted-foreground">
												hace 2 días
											</span>
										</div>
										<p className="text-foreground">
											Excelente guía, muy detallada y fácil de seguir. Los mapas
											están perfectos.
										</p>
										<div className="flex items-center gap-1">
											{Array.from({ length: 5 }, (_, i) => (
												<Star
													key={i}
													className={`h-4 w-4 ${i < 5 ? "fill-current text-yellow-500" : "text-muted-foreground"}`}
												/>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="achievements" className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Logros Desbloqueados</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{/* Mock achievements */}
							<Card className="bg-gradient-card border-border/50">
								<CardContent className="p-6 text-center">
									<div className="flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-4">
										<Trophy className="h-8 w-8 text-yellow-500" />
									</div>
									<h3 className="font-bold mb-2">Primera Guía</h3>
									<p className="text-sm text-muted-foreground">
										Publicó su primera guía en la plataforma
									</p>
									<Badge variant="secondary" className="mt-2">
										Desbloqueado
									</Badge>
								</CardContent>
							</Card>

							<Card className="bg-gradient-card border-border/50">
								<CardContent className="p-6 text-center">
									<div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4">
										<Star className="h-8 w-8 text-primary" />
									</div>
									<h3 className="font-bold mb-2">Experto</h3>
									<p className="text-sm text-muted-foreground">
										Alcanzó un rating promedio de 4.5 estrellas
									</p>
									<Badge variant="secondary" className="mt-2">
										Desbloqueado
									</Badge>
								</CardContent>
							</Card>

							<Card className="bg-gradient-card border-border/50">
								<CardContent className="p-6 text-center">
									<div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mx-auto mb-4">
										<Users className="h-8 w-8 text-accent" />
									</div>
									<h3 className="font-bold mb-2">Comunidad</h3>
									<p className="text-sm text-muted-foreground">
										Obtuvo 100 seguidores
									</p>
									<Badge variant="outline" className="mt-2">
										Bloqueado
									</Badge>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
