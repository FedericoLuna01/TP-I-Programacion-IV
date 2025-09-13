export type CreateUser = {
	email: string;
	username: string;
	password: string;
	role?: "user" | "admin";
};
