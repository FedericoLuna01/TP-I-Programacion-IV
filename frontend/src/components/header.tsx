import { Link } from "@tanstack/react-router";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import Logo from "./ui/logo";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
			<div className="container mx-auto">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Logo />

					{/* Navigation */}
					<nav className="flex items-center gap-2">
						<Button variant="ghost" className="hidden lg:flex">
							Explorar
						</Button>
						<Button variant="ghost" className="hidden lg:flex">
							Categorías
						</Button>
						<Button asChild variant="outline" className="hidden sm:flex">
							<Link to="/">
								<User className="h-4 w-4 mr-2" />
								Perfil
							</Link>
						</Button>
						<Button asChild className="shadow-glow">
							<Link to="/">Crear Guía</Link>
						</Button>

						{/* Mobile menu */}
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
						</Button>
						<ModeToggle />
					</nav>
				</div>

				{/* Mobile Search */}
				<div className="pb-4 md:hidden">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Buscar guías..."
							className="pl-10 bg-secondary/50 border-border/50"
						/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
