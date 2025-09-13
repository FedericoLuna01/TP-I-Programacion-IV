import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
	ArrowLeftIcon,
	BookmarkIcon,
	CalendarIcon,
	EditIcon,
	EyeIcon,
	HeartIcon,
	MessageCircleIcon,
	ShareIcon,
	StarIcon,
	TrophyIcon,
	UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getGuideById } from "@/lib/mock-data";
import CommentSection from "./-components/comment-section";

export const Route = createFileRoute("/_appLayout/(guias)/guias/$guideId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	const guide = getGuideById(params.guideId);

	if (!guide) {
		return (
			<div>
				<p>Guía no encontrada</p>
			</div>
		)
	}

	const handleAddComment = (content: string, rating?: number) => {
		toast.success("Comentario añadido correctamente");
		// Aquí iría la lógica para agregar el comentario
	}

	const handleToggleFavorite = () => {
		toast.success(
			guide.isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
		)
	}

	const handleShare = () => {
		navigator.clipboard.writeText(window.location.href);
		toast.success("Enlace copiado al portapapeles");
	}

	return (
		<section className="container mx-auto pt-20">
			<Button variant="outline" onClick={() => window.history.back()}>
				<ArrowLeftIcon /> Volver
			</Button>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{/* Guide Header */}
					<div className="space-y-6">
						<div className="relative overflow-hidden rounded-md">
							<img
								src={guide.image}
								alt={guide.title}
								className="w-full h-64 object-cover"
							/>
							<div className="absolute top-4 right-4">
								<Badge
								// className={`${difficultyColors[guide.difficulty]} border font-medium`}
								>
									{"Hard"}
								</Badge>
							</div>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
								<p className="text-accent-foreground font-semibold text-lg">
									{guide.game}
								</p>
							</div>
						</div>

						<div className="space-y-4">
							<h1 className="text-3xl lg:text-4xl font-bold leading-tight">
								{guide.title}
							</h1>

							<p className="text-xl text-muted-foreground">{guide.summary}</p>

							{/* Tags */}
							<div className="flex flex-wrap gap-2">
								{guide.tags.map((tag, index) => (
									<Badge key={index} variant="secondary">
										{tag}
									</Badge>
								))}
							</div>

							{/* Stats & Actions */}
							<div className="flex flex-wrap items-center justify-between gap-4 pt-4">
								<div className="flex items-center gap-6 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<StarIcon className="h-4 w-4 fill-current text-yellow-500" />
										<span>{guide.rating}</span>
									</div>
									<div className="flex items-center gap-1">
										<EyeIcon className="h-4 w-4" />
										<span>{guide.views}</span>
									</div>
									<div className="flex items-center gap-1">
										<MessageCircleIcon className="h-4 w-4" />
										<span>{guide.comments.length}</span>
									</div>
									<div className="flex items-center gap-1">
										<CalendarIcon className="h-4 w-4" />
										<span>
											{formatDistanceToNow(new Date(guide.publishedAt), {
												addSuffix: true,
												locale: es,
											})}
										</span>
									</div>
								</div>

								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={handleToggleFavorite}
									>
										<BookmarkIcon
											className={`h-4 w-4 mr-2 ${guide.isFavorite ? `fill-current` : ``}`}
										/>
										{guide.isFavorite ? "Guardado" : "Guardar"}
									</Button>
									<Button variant="outline" size="sm" onClick={handleShare}>
										<ShareIcon className="h-4 w-4 mr-2" />
										Compartir
									</Button>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					{/* Guide Content */}
					<div className="prose prose-invert max-w-none">
						<div
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <no other way to do it>
							dangerouslySetInnerHTML={{ __html: guide.content }}
							className="space-y-4 tiptap"
						/>
					</div>

					<Separator />

					{/* Comments */}
					<CommentSection
						comments={guide.comments}
						onAddComment={handleAddComment}
						allowRating={true}
					/>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Author Card */}
					<Card className="bg-gradient-card border-border/50">
						<CardContent className="p-6">
							<div className="flex items-center gap-3 mb-4">
								<Avatar className="h-16 w-16">
									<AvatarImage src={guide.author.avatar} />
									<AvatarFallback className="bg-primary/20 text-lg">
										{guide.author.displayName.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<h3 className="font-bold text-lg">
										{guide.author.displayName}
									</h3>
									<p className="text-muted-foreground">
										@{guide.author.username}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4">
								<div className="text-center">
									<div className="font-bold text-lg">
										{guide.author.guidesCreated}
									</div>
									<div className="text-xs text-muted-foreground">Guías</div>
								</div>
								<div className="text-center">
									<div className="font-bold text-lg flex items-center justify-center gap-1">
										<StarIcon className="h-4 w-4 fill-current text-yellow-500" />
										{guide.author.totalRating}
									</div>
									<div className="text-xs text-muted-foreground">Rating</div>
								</div>
							</div>

							<div className="flex gap-2">
								<Button variant="outline" size="sm" className="flex-1" asChild>
									<Link
										to={"/perfil/$userId"}
										params={{ userId: guide.author.id }}
									>
										<UserIcon className="h-4 w-4 mr-2" />
										Ver Perfil
									</Link>
								</Button>
								<Button variant="outline" size="sm" asChild>
									<Link to={"/"}>
										<EditIcon className="h-4 w-4" />
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Quick Actions */}
					<Card className="bg-gradient-card border-border/50">
						<CardContent className="p-6">
							<h3 className="font-bold mb-4">Acciones Rápidas</h3>
							<div className="space-y-3">
								<Button variant="outline" className="w-full justify-start">
									<TrophyIcon className="h-4 w-4 mr-2" />
									Reportar problema
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<HeartIcon className="h-4 w-4 mr-2" />
									Seguir autor
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<MessageCircleIcon className="h-4 w-4 mr-2" />
									Contactar autor
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Related Guides */}
					<Card className="bg-gradient-card border-border/50">
						<CardContent className="p-6">
							<h3 className="font-bold mb-4">Guías Relacionadas</h3>
							<div className="space-y-3">
								<div className="text-sm">
									<div className="font-medium line-clamp-2 mb-1">
										Secretos Avanzados del Reino Élfico
									</div>
									<div className="text-muted-foreground">por ElvenMaster</div>
								</div>
								<Separator className="opacity-30" />
								<div className="text-sm">
									<div className="font-medium line-clamp-2 mb-1">
										Guía de Armas Legendarias
									</div>
									<div className="text-muted-foreground">por WeaponExpert</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}
