import type { CreateUser } from "@/types/user";

export async function createUser(data: CreateUser) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		throw new Error("Error creating user");
	}
	return res.json();
}
