export interface Guide {
	id: string;
	title: string;
	game: string;
	author: User;
	authorId: string;
	rating: number;
	views: number;
	comments: Comment[];
	image: string;
	tags: string[];
	publishedAt: string;
	difficulty: "Fácil" | "Medio" | "Difícil";
	content: string;
	summary: string;
	isFavorite?: boolean;
	isDraft?: boolean;
}

export interface User {
	id: string;
	username: string;
	displayName: string;
	avatar?: string;
	bio?: string;
	guidesCreated: number;
	totalRating: number;
	joinedAt: string;
	guides: string[];
}

export interface Comment {
	id: number;
	author: string;
	content: string;
	rating: number;
	likes: number;
	createdAt: Date;
}

const mockUsers: User[] = [
	{
		id: "user-1",
		username: "gamerPro",
		displayName: "GamerPro123",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
		bio: "Apasionado por los videojuegos y creador de guías. ¡Si te gusta lo que hago, dale like! 🎮",
		guidesCreated: 3,
		totalRating: 4.8,
		joinedAt: "2023-01-15T10:00:00Z",
		guides: ["guide-1", "guide-3"],
	},
	{
		id: "user-2",
		username: "marioFan",
		displayName: "MushroomKingdomFan",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
		bio: "Fanático de los juegos de Nintendo. ¡Siempre buscando secretos y atajos! ⭐",
		guidesCreated: 1,
		totalRating: 4.5,
		joinedAt: "2022-05-20T12:30:00Z",
		guides: ["guide-2"],
	},
];

const mockComments: Comment[] = [
	{
		id: 1,
		author: "playerOne",
		content: "¡Excelente guía, muy detallada! Me ayudó mucho.",
		rating: 5,
		likes: 12,
		createdAt: new Date("2024-08-28T14:30:00Z"),
	},
	{
		id: 2,
		author: "noobSlayer",
		content:
			"Buena guía, aunque faltó un poco de información sobre las misiones secundarias.",
		rating: 4,
		likes: 3,
		createdAt: new Date("2024-08-27T18:00:00Z"),
	},
	{
		id: 3,
		author: "gamerPro",
		content:
			"Gracias por el feedback. ¡Lo tendré en cuenta para futuras actualizaciones!",
		rating: 5,
		likes: 5,
		createdAt: new Date("2024-08-28T15:00:00Z"),
	},
];

export const mockGuides: Guide[] = [
	{
		id: "guide-1",
		title: "Guía completa para principiantes en Elden Ring",
		game: "Elden Ring",
		author: mockUsers[0],
		authorId: "user-1",
		rating: 4.8,
		views: 15000,
		comments: [mockComments[0], mockComments[2]],
		image:
			"https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/YMUoJUYNX0xWk6eTKuZLr5Iw.jpg",
		tags: ["Elden Ring", "RPG", "Principiantes", "Tutorial"],
		publishedAt: "2024-08-25T10:00:00Z",
		difficulty: "Difícil",
		content:
			'<h1>Esto es un titulo de una guia</h1><div data-youtube-video=""><iframe class="rounded-lg mx-auto" width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" rel="1" src="https://www.youtube.com/embed/kgUH-SJy3Uw?rel=1" start="0"></iframe></div><p></p><p>Con este video vas a aprender a pasarlo</p><p></p><h2>Esto es solo para probar si anda</h2><img class="rounded-lg max-w-full h-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkN1UxCYoZNK0rMZBha8Uxfwb7b9boVGxkLg&amp;s"><p></p><p></p><ul><li><p>Item 1</p></li><li><p>Item 2</p></li></ul><p></p><ol><li><p>asd</p></li><li><p>asdasd</p></li><li><p>12123123</p></li></ol><p></p>',
		summary:
			"Una guía esencial para los nuevos jugadores de Elden Ring, que abarca los conceptos básicos del juego y los primeros pasos.",
		isFavorite: true,
	},
	{
		id: "guide-2",
		title: "Secretos y atajos en Super Mario Bros. Wonder",
		game: "Super Mario Bros. Wonder",
		author: mockUsers[1],
		authorId: "user-2",
		rating: 4.5,
		views: 5000,
		comments: [mockComments[1]],
		image:
			"https://www.nintendo.com/eu/media/images/10_share_images/portals_3/2x1_SuperMarioHub_image1600w.jpg",
		tags: ["Super Mario", "Nintendo", "Plataformas", "Secretos"],
		publishedAt: "2024-08-20T15:30:00Z",
		difficulty: "Medio",
		content:
			"Descubre todos los secretos ocultos en los niveles de Super Mario Bros. Wonder, incluyendo atajos, semillas maravilla y monedas moradas difíciles de encontrar.",
		summary:
			"Guía detallada de secretos, atajos y coleccionables en el juego Super Mario Bros. Wonder.",
	},
	{
		id: "guide-3",
		title: "Construcción avanzada en Minecraft: Consejos para expertos",
		game: "Minecraft",
		author: mockUsers[0],
		authorId: "user-1",
		rating: 4.9,
		views: 25000,
		comments: [],
		image:
			"https://xboxwire.thesourcemediaassets.com/sites/4/15YR_Free_Cape-1-7cbcb0739e3df57534ec-9063efed017354d1b1c3.jpg",
		tags: ["Minecraft", "Construcción", "Avanzado", "Tutorial"],
		publishedAt: "2024-08-18T12:00:00Z",
		difficulty: "Difícil",
		content:
			"Si ya dominas lo básico, esta guía te mostrará técnicas de construcción avanzadas para llevar tus creaciones al siguiente nivel en Minecraft. Aprende a usar la iluminación, texturas y formas para crear estructuras impresionantes.",
		summary:
			"Técnicas y trucos de construcción avanzada para jugadores experimentados de Minecraft.",
	},
];

export const getGuideById = (id: string): Guide | undefined => {
	return mockGuides.find((guide) => guide.id === id);
};
