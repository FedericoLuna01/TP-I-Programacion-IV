import { Link } from "@tanstack/react-router";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import Logo from "./ui/logo";

const Header = () => {
	const IS_LOGGED = false;

	return (
		<header className="fixed z-50 w-full bg-background/70 backdrop-blur-xl border-b">
			<div className="container mx-auto">
				<div className="flex h-16 items-center justify-between">
					<Logo />
					<nav className="flex items-center gap-2">
						<Button asChild variant="ghost" className="hidden lg:flex">
							<Link to="/guias">Explorar</Link>
						</Button>
						{IS_LOGGED ? (
							<>
								<Button asChild variant="outline" className="hidden sm:flex">
									<Link to="/perfil">
										<User className="h-4 w-4 mr-2" />
										Perfil
									</Link>
								</Button>
								<Button asChild className="shadow-glow">
									<Link to="/crear-guia">Crear Guía</Link>
								</Button>
							</>
						) : (
							<>
								<Button asChild variant="outline">
									<Link to="/iniciar-sesion">Iniciar sesión</Link>
								</Button>
								<Button asChild>
									<Link to="/registrarse">Registrarse</Link>
								</Button>
							</>
						)}
						{/* Mobile menu */}
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
						</Button>
						<ModeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
