import { Link } from "@tanstack/react-router";
import {
	ClockIcon,
	EditIcon,
	EyeIcon,
	MessageCircleIcon,
	MoreHorizontalIcon,
	StarIcon,
	TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Guide } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardFooter } from "./card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const GuideCard = ({
	guide,
	showAuthor = true,
	isOwner = false,
}: {
	guide: Guide;
	showAuthor?: boolean;
	isOwner?: boolean;
}) => {
	return (
		<Link to={`/guias/$guideId`} params={{ guideId: guide.id }}>
			<Card className="group/card overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 pt-0 max-w-xl h-full">
				<div className="relative overflow-hidden">
					<img
						src={guide.image}
						alt={guide.title}
						className="w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
					/>
					{isOwner && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									size="icon"
									variant="outline"
									className="absolute top-2 right-2"
								>
									<span className="sr-only">Open menu</span>
									<MoreHorizontalIcon />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Acciones de la guía</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link
										to="/editar-guia/$guideId"
										params={{ guideId: guide.id }}
									>
										<EditIcon className="stroke-foreground" />
										Editar
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-destructive focus:text-destructive"
									onSelect={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={(e) => e.stopPropagation()}
								>
									<AlertDialog>
										<AlertDialogTrigger className="flex items-center gap-2 w-full">
											<TrashIcon className="stroke-destructive" />
											Eliminar
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
												<AlertDialogDescription>
													Esta acción no se puede deshacer. Esto eliminará
													permanentemente la guía y todos sus comentarios.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancelar</AlertDialogCancel>
												<AlertDialogAction
													className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
													onClick={() => {
														// Aquí irá la lógica para eliminar la guía
														console.log("Eliminando guía:", guide.id);
														toast.success("Guia eliminada correctamente");
													}}
												>
													Eliminar
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
				<CardContent className="p-4">
					<div className="space-y-3">
						<h3 className="font-bold text-lg line-clamp-2 group-hover/card:text-primary transition-colors">
							{guide.title}
						</h3>
						<div className="flex flex-wrap gap-1">
							{guide.tags.map((tag, index) => (
								<Badge key={index} className="text-xs">
									{tag}
								</Badge>
							))}
						</div>
						<div className="flex items-center justify-between text-sm text-muted-foreground">
							<div className="flex items-center gap-4">
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
							</div>
						</div>
					</div>
				</CardContent>
				{showAuthor && (
					<CardFooter className="mt-auto border-t flex items-center justify-between">
						<HoverCard>
							<HoverCardTrigger>
								<Link
									to="/perfil/$userId"
									params={{
										userId: guide.author.id,
									}}
									className="flex items-center gap-2 group/author"
								>
									<Avatar className="h-6 w-6">
										<AvatarImage src={guide.author.avatar} />
										<AvatarFallback className="text-xs bg-primary/20">
											{guide.author.displayName.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<span className="text-sm text-foreground group-hover/author:underline">
										{guide.author.displayName}
									</span>
								</Link>
							</HoverCardTrigger>
							<HoverCardContent className="w-xs gap-2 flex flex-col">
								<div
									className={cn(
										"h-18 w-full rounded-md border",
										guide.author.banner,
									)}
								/>
								<div className="flex flex-col gap-2 -mt-6">
									<Avatar className="h-12 w-12 border">
										<AvatarImage src={guide.author.avatar} />
										<AvatarFallback className="text-xs bg-primary/20">
											{guide.author.displayName.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<Link
										to="/perfil/$userId"
										params={{
											userId: guide.author.id,
										}}
										className="hover:underline"
									>
										<span className="text-foreground ">
											{guide.author.displayName}
										</span>
									</Link>
								</div>
								<p className="text-muted-foreground text-sm">
									{guide.author.bio}
								</p>
								<div>
									<span className="font-bold">
										{guide.author.followers}{" "}
										<span className="text-muted-foreground font-normal">
											seguidores
										</span>
									</span>
								</div>
							</HoverCardContent>
						</HoverCard>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<ClockIcon className="h-3 w-3" />
							<span>{new Date(guide.publishedAt).toLocaleDateString()}</span>
						</div>
					</CardFooter>
				)}
			</Card>
		</Link>
	);
};

export { GuideCard };
