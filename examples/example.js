const Converso = require('../index');

// Definir una acción conversacional
Converso.defineAction('CheckWeather', {
	description: 'Retrieve the weather forecast for a specified location',
	parameters: {
		location: {
			type: 'string',
			description: 'The location to get the weather for'
		}
	},
	handler: async (params) => {
		try {
			// Simulación de lógica para obtener el pronóstico del clima
			const weather = `El clima en ${params.location} es soleado con 25°C.`;
			return weather;
		} catch (error) {
			console.error('Error en el handler de CheckWeather:', error);
			return 'No se pudo obtener el pronóstico del clima.';
		}
	}
});

// Procesar una solicitud de lenguaje natural
const userRequest = '¿Cómo está el clima en Tokio?';
Converso.handleRequest(userRequest).then(response => {
	console.log(response); // Salida: "El clima en Tokio es soleado con 25°C."
}); 