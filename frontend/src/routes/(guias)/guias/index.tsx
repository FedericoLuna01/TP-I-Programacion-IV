import { createFileRoute } from "@tanstack/react-router";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GuideCard } from "@/components/ui/guide-card";
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { mockGuides } from "@/lib/mock-data";

export const Route = createFileRoute("/(guias)/guias/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [sortBy, setSortBy] = useState<string>("mas-reciente");
	const [activeFiltersCount, setActiveFiltersCount] = useState<number>(2);

	const handleSortChange = (value: string) => {
		setSortBy(value);
		// Aquí puedes implementar la lógica de ordenamiento
	}

	const clearFilters = () => {
		setActiveFiltersCount(0);
		// Aquí puedes implementar la lógica para limpiar los filtros
	}

	return (
		<section className="min-h-[60vh] container mx-auto py-24">
			<div className="flex justify-between items-center">
				<Heading className="w-full">
					<HeadingTitle>Todas las guías</HeadingTitle>
					<HeadingDescription>
						Explora nuestra colección de guías y tutoriales.
					</HeadingDescription>
				</Heading>
				<div className="flex gap-2">
					<Input placeholder="Buscar guías..." className="w-sm" />
					<Select value={sortBy} onValueChange={handleSortChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Ordenar por..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="mas-reciente">Más reciente</SelectItem>
							<SelectItem value="mas-vieja">Más vieja</SelectItem>
							<SelectItem value="mejor-valorada">Mejor valorada</SelectItem>
							<SelectItem value="peor-valorada">Peor valorada</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-8">
				<aside className="border w-full col-span-1 rounded-md sticky top-24 h-fit">
					<Card className="bg-card/50 backdrop-blur-sm border-border/50">
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
								{activeFiltersCount > 0 && (
									<Button variant="ghost" size="sm" onClick={clearFilters}>
										Limpiar
									</Button>
								)}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Game Filter */}
							<div>
								<Label className="text-sm font-medium mb-3 block">Juego</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Todos los juegos" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Todos los juegos</SelectItem>
										{/* {uniqueGames.map(game => (
                          <SelectItem key={game} value={game}>{game}</SelectItem>
                        ))} */}
									</SelectContent>
								</Select>
							</div>

							<Separator />

							{/* Difficulty Filter */}
							<div>
								<Label className="text-sm font-medium mb-3 block">
									Dificultad
								</Label>
								<Select
								// value={selectedDifficulty}
								// onValueChange={setSelectedDifficulty}
								>
									<SelectTrigger>
										<SelectValue placeholder="Todas las dificultades" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Todas las dificultades</SelectItem>
										{/* {difficulties.map((difficulty) => (
											<SelectItem key={difficulty} value={difficulty}>
												{difficulty}
											</SelectItem>
										))} */}
									</SelectContent>
								</Select>
							</div>

							<Separator />

							{/* Rating Filter */}
							<div>
								<Label className="text-sm font-medium mb-3 block">
									Calificación mínima
								</Label>
								<div className="space-y-2">
									{[0, 3, 4, 4.5].map((rating) => (
										<div key={rating} className="flex items-center space-x-2">
											<Checkbox
												id={"rating-${rating}"}
												// checked={minRating === rating}
												// onCheckedChange={() =>
												// 	setMinRating(minRating === rating ? 0 : rating)
												// }
											/>
											<label
												htmlFor={"rating-${rating}"}
												className="flex items-center gap-1 text-sm"
											>
												{rating === 0 ? (
													"Todas"
												) : (
													<>
														{rating}
														<StarIcon className="h-3 w-3 fill-yellow-500 text-yellow-500" />
														o más
													</>
												)}
											</label>
										</div>
									))}
								</div>
							</div>

							<Separator />

							{/* Tags Filter */}
							<div>
								<Label className="text-sm font-medium mb-3 block">
									Etiquetas
								</Label>
								<div className="space-y-2 max-h-40 overflow-y-auto">
									{/* {uniqueTags.map((tag) => (
										<div key={tag} className="flex items-center space-x-2">
											<Checkbox
												id={"tag-${tag}"}
												checked={selectedTags.includes(tag)}
												onCheckedChange={() => handleTagToggle(tag)}
											/>
											<label htmlFor={`tag-${tag}`} className="text-sm">
												{tag}
											</label>
										</div>
									))} */}
								</div>
							</div>
						</CardContent>
					</Card>
				</aside>
				<div className="col-span-3">
					<div className="grid grid-cols-3 gap-8">
						{Array.from({ length: 5 }).map((_, i) =>
							mockGuides.map((guide) => (
								<GuideCard key={`${i}-${guide.id}`} guide={guide} />
							)),
						)}
					</div>
					<div className="mt-8">
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious href="#" />
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">1</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#" isActive>
										2
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">3</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationItem>
									<PaginationNext href="#" />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			</div>
		</section>
	)
}
