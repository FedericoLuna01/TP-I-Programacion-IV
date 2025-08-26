import { Link } from "@tanstack/react-router";
import {
	ClockIcon,
	EyeIcon,
	FlameIcon,
	MessageCircleIcon,
	StarIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const FeaturedGuides = () => {
	const tags = ["Estrategia", "Mundo Abierto", "Acción", "Aventura", "RPG"];
	return (
		<section className="py-10 container mx-auto" id="featured">
			<div className="flex items-start gap-2">
				<FlameIcon className="text-violet-800" size={50} />
				<h1 className="text-5xl leading-tight">Guías destacadas</h1>
			</div>
			<p className="text-lg">
				Explora nuestras guías más populares y aprende de los expertos.
			</p>
			<div className="flex gap-6">
				{new Array(3).fill(0).map((item, index) => (
					<Link to={`/`} key={`${index}-featured-guide`}>
						<Card className="group overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 pt-0">
							<div className="relative overflow-hidden">
								<img
									src={"./reddead2.jpg"}
									alt={"Red dead redemption 2"}
									className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>

							<CardContent className="p-4">
								<div className="space-y-3">
									<h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
										Guía completa para dominar Red Dead Redemption 2
									</h3>

									<div className="flex flex-wrap gap-1">
										{tags.slice(0, 3).map((tag, index) => (
											<Badge key={index} className="text-xs">
												{tag}
											</Badge>
										))}
									</div>

									<div className="flex items-center justify-between text-sm text-muted-foreground">
										<div className="flex items-center gap-4">
											<div className="flex items-center gap-1">
												<StarIcon className="h-4 w-4 fill-current text-yellow-500" />
												<span>4.3</span>
											</div>
											<div className="flex items-center gap-1">
												<EyeIcon className="h-4 w-4" />
												<span>1.2k</span>
											</div>
											<div className="flex items-center gap-1">
												<MessageCircleIcon className="h-4 w-4" />
												<span>12</span>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-2 border-t border-border/30">
										<div className="flex items-center gap-2">
											<Avatar className="h-6 w-6">
												<AvatarImage src="" />
												<AvatarFallback className="text-xs bg-primary/20">
													F
												</AvatarFallback>
											</Avatar>
											<span className="text-sm text-foreground">
												Federico Luna
											</span>
										</div>
										<div className="flex items-center gap-1 text-xs text-muted-foreground">
											<ClockIcon className="h-3 w-3" />
											<span>3 Dias</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
};

export default FeaturedGuides;
