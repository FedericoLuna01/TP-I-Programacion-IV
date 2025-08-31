import { Link } from "@tanstack/react-router";
import { FlameIcon } from "lucide-react";
import { mockGuides } from "@/lib/mock-data";
import { Button } from "./ui/button";
import { GuideCard } from "./ui/guide-card";

const FeaturedGuides = () => {
	return (
		<section className="py-10 container mx-auto" id="featured">
			<div className="w-full flex flex-row items-center justify-between">
				<div className="flex items-start gap-2">
					<FlameIcon className="text-violet-800" size={50} />
					<h1 className="text-5xl leading-tight">Guías destacadas</h1>
				</div>
				<Button asChild variant="outline">
					<Link to="/guias">Ver todas</Link>
				</Button>
			</div>
			<p className="text-lg">
				Explora nuestras guías más populares y aprende de los expertos.
			</p>
			<div className="flex mt-4 justify-between gap-6">
				{mockGuides.map((guide) => (
					<GuideCard key={guide.id} guide={guide} />
				))}
			</div>
		</section>
	);
};

export default FeaturedGuides;
