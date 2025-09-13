import { Heart, MessageCircle, Send, Star } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/lib/mock-data";

interface CommentSectionProps {
	comments: Comment[];
	onAddComment: (content: string, rating?: number) => void;
	allowRating?: boolean;
}

const CommentSection = ({
	comments,
	onAddComment,
	allowRating = false,
}: CommentSectionProps) => {
	const [newComment, setNewComment] = useState("");
	const [newRating, setNewRating] = useState(0);
	const [hoveredStar, setHoveredStar] = useState(0);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newComment.trim()) {
			onAddComment(newComment, allowRating ? newRating : undefined);
			setNewComment("");
			setNewRating(0);
		}
	};

	const renderStars = (rating: number, interactive: boolean = false) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`h-4 w-4 ${
					i < rating
						? "fill-yellow-500 text-yellow-500"
						: "text-muted-foreground"
				} ${interactive ? "cursor-pointer hover:text-yellow-500" : ""}`}
				onClick={interactive ? () => setNewRating(i + 1) : undefined}
				onMouseEnter={interactive ? () => setHoveredStar(i + 1) : undefined}
				onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
			/>
		));
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<MessageCircle className="h-5 w-5 text-primary" />
				<h3 className="text-xl font-bold">Comentarios ({comments.length})</h3>
			</div>

			{/* Add Comment Form */}
			<Card className="bg-gradient-card border-border/50">
				<CardContent className="p-6">
					<form onSubmit={handleSubmit} className="space-y-4">
						{allowRating && (
							<div className="space-y-2">
								<Label className="text-sm font-medium">Tu valoración</Label>
								<div className="flex gap-1">
									{renderStars(hoveredStar || newRating, true)}
								</div>
							</div>
						)}

						<div>
							<Textarea
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="Comparte tu experiencia con esta guía..."
								className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary"
							/>
						</div>

						<div className="flex justify-end">
							<Button
								type="submit"
								disabled={!newComment.trim()}
								className="shadow-glow"
							>
								<Send className="h-4 w-4 mr-2" />
								Enviar Comentario
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			{/* Comments List */}
			<div className="space-y-4">
				{comments.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground">
						<MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>Sé el primero en comentar esta guía</p>
					</div>
				) : (
					comments.map((comment, index) => (
						<div key={comment.id}>
							<Card className="bg-gradient-card border-border/30">
								<CardContent className="p-6">
									<div className="flex gap-3">
										<Avatar className="h-10 w-10">
											<AvatarImage src="" />
											<AvatarFallback className="bg-primary/20">
												{comment.author.charAt(0)}
											</AvatarFallback>
										</Avatar>

										<div className="flex-1 space-y-2">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<span className="font-semibold">
														{comment.author}
													</span>
													{comment.rating && (
														<div className="flex items-center gap-1">
															{renderStars(comment.rating)}
															<span className="text-sm text-muted-foreground">
																({comment.rating}/5)
															</span>
														</div>
													)}
												</div>
												<span className="text-sm text-muted-foreground">
													{comment.createdAt.toLocaleDateString()}
												</span>
											</div>

											<p className="text-foreground">{comment.content}</p>

											<div className="flex items-center gap-4 pt-2">
												<Button
													variant="ghost"
													size="sm"
													className="text-muted-foreground hover:text-accent"
												>
													<Heart className="h-4 w-4 mr-1" />
													{comment.likes}
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="text-muted-foreground"
												>
													Responder
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							{index < comments.length - 1 && (
								<Separator className="my-4 opacity-30" />
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default CommentSection;
