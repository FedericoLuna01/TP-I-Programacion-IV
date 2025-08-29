import { Link } from "@tanstack/react-router";
import { ClockIcon, EyeIcon, MessageCircleIcon, StarIcon } from "lucide-react";
import type { Guide } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";

const GuideCard = ({ guide }: { guide: Guide }) => {
	return (
		<Link to={`/guias/$guiaId`} params={{ guiaId: guide.id }}>
			<Card className="group overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 pt-0 max-w-xl">
				<div className="relative overflow-hidden">
					<img
						src={guide.image}
						alt={guide.title}
						className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
				<CardContent className="p-4">
					<div className="space-y-3">
						<h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
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
						<div className="flex items-center justify-between pt-2 border-t border-border/30">
							<div className="flex items-center gap-2">
								<Avatar className="h-6 w-6">
									<AvatarImage src={guide.author.avatar} />
									<AvatarFallback className="text-xs bg-primary/20">
										{guide.author.displayName.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<span className="text-sm text-foreground">
									{guide.author.displayName}
								</span>
							</div>
							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<ClockIcon className="h-3 w-3" />
								<span>{new Date(guide.publishedAt).toLocaleDateString()}</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export { GuideCard };
