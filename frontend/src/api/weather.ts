export async function getWeather() {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/WeatherForecast`);

	if (!res.ok) {
		throw new Error("Error interno del servidor");
	}

	return res.json();
}
