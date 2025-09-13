import { createFileRoute } from "@tanstack/react-router";
import {
	BookOpenIcon,
	MouseIcon,
	SearchIcon,
	TrendingUpIcon,
	UsersIcon,
} from "lucide-react";
import FeaturedGuides from "@/components/featured-guides";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeaturesSection } from "./-components/features";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Header />
			<div className="min-h-screen flex items-center justify-center relative">
				<div
					className="inset-0 absolute -z-10 opacity-30 dark:opacity-45"
					style={{
						backgroundImage: "url('./hero-img.jpg')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-t from-background from-10%" />
				<div className="flex items-center justify-center container flex-col space-y-10 z-10">
					<div className="space-y-2">
						<h1 className="text-7xl font-black">Domina cualquier juego</h1>
						<p className="text-muted-foreground max-w-3xl text-center text-3xl">
							Con nuestras guías, estrategias y consejos, serás un experto en
							poco tiempo.
						</p>
					</div>
					<div className="max-w-2xl mx-auto ">
						<div className="relative w-lg">
							<SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
							<Input
								placeholder="Busca guías para cualquier juego..."
								className="pl-12 pr-32 h-12 text-lg bg-background dark:bg-background/80 border-border/50"
							/>
							<Button className="absolute right-1 top-1 h-10 " size="sm">
								Buscar
							</Button>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
						<div className="flex flex-col items-center gap-2">
							<div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border border-primary/30">
								<BookOpenIcon className="h-6 w-6 text-primary" />
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-foreground">10K+</p>
								<p className="text-sm text-muted-foreground">
									Guías disponibles
								</p>
							</div>
						</div>

						<div className="flex flex-col items-center gap-2">
							<div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 border border-secondary/30">
								<UsersIcon className="h-6 w-6 text-secondary" />
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-foreground">50K+</p>
								<p className="text-sm text-muted-foreground">
									Jugadores activos
								</p>
							</div>
						</div>

						<div className="flex flex-col items-center gap-2">
							<div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600/20 border border-emerald-600/30">
								<TrendingUpIcon className="h-6 w-6 text-emerald-600" />
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-foreground">1M+</p>
								<p className="text-sm text-muted-foreground">
									Problemas resueltos
								</p>
							</div>
						</div>
					</div>
				</div>
				<a
					href="#featured"
					className="absolute bottom-14  hover:cursor-pointer"
				>
					<MouseIcon className="size-8 animate-bounce" />
				</a>
			</div>
			<FeaturedGuides />
			<FeaturesSection />
			<section className="py-16 text-center bg-gradient-card rounded-lg border border-border/50 container mx-auto shadow-sm">
				<div className="max-w-2xl mx-auto space-y-6">
					<h2 className="text-3xl font-bold">
						¿Tienes una guía increíble que compartir?
					</h2>
					<p className="text-xl text-muted-foreground">
						Únete a nuestra comunidad de creadores y ayuda a otros jugadores a
						superar sus desafíos favoritos.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="shadow-glow">
							Crear mi Primera Guía
						</Button>
						<Button variant="outline" size="lg">
							Conocer la Comunidad
						</Button>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
