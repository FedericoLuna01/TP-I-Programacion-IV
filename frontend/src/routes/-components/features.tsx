import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type FeatureItem = {
	title: string;
	image: string;
};

const ITEMS: FeatureItem[] = [
	{
		title: "Comunidad Activa",
		image: "./features/feature-1.jpg",
	},
	{
		title: "Guías Personalizadas",
		image: "./features/feature-2.jpg",
	},
	{
		title: "Soporte 24/7",
		image: "./features/feature-3.jpg",
	},
	{
		title: "Actualizaciones Constantes",
		image: "./features/feature-4.jpg",
	},
];

const FeaturesSection = () => {
	const [activeItem, setActiveItem] = useState<FeatureItem | null>(ITEMS[0]);

	return (
		<section className="mt-20 relative">
			<div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden h-[10rem] w-[10rem] xl:h-[40rem] xl:w-[40rem] rounded-full bg-primary-600/20 blur-3xl" />
			<div className="container mx-auto">
				<div className="w-full flex items-start gap-20">
					<div className="w-full pt-[10vh] pb-[20vh]">
						{ITEMS.map((item) => (
							<div key={item.title} className="flex flex-col items-start">
								<FeatureTitle setActiveItem={setActiveItem}>
									{item.title}
								</FeatureTitle>
							</div>
						))}
					</div>
					<div className="w-full sticky top-[30vh] flex items-center justify-center h-[50vh]">
						<div className="w-[80%]">
							{ITEMS.map((item) => (
								<img
									key={item.title}
									src={item.image}
									alt={item.title}
									className={cn(
										"object-cover rounded-lg absolute top-0 inset-0 left-0 w-[80%] opacity-0 transition duration-200",
										{
											"opacity-100": activeItem?.title === item.title,
										},
									)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const FeatureTitle = ({
	children,
	setActiveItem,
}: {
	children: React.ReactNode;
	setActiveItem: (item: FeatureItem | null) => void;
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

	useEffect(() => {
		if (isInView) {
			setActiveItem({ title: children as string, image: "" });
		}
	}, [isInView, children, setActiveItem]);

	return (
		<h3
			ref={ref}
			className={cn("text-5xl font-semibold text-muted-foreground py-20 z-30", {
				"text-primary": isInView,
			})}
		>
			{children}
		</h3>
	);
};

export { FeaturesSection };
