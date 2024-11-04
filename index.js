const { Document, VectorStoreIndex, serviceContextFromDefaults } = require("llamaindex");

class Converso {
	constructor() {
		this.actions = {};
		this.vectorIndex = null;
		this.initialize();
	}

	async initialize() {
		try {
			// Inicializar el contexto de servicio
			const serviceContext = serviceContextFromDefaults({});

			// Crear documentos con las descripciones de las acciones
			this.vectorIndex = await this._createActionIndex(serviceContext);
		} catch (error) {
			console.error('Error initializing Converso:', error);
			throw new Error('Failed to initialize Converso');
		}
	}

	async _createActionIndex(serviceContext) {
		try {
			// Crear documentos con las descripciones de las acciones
			const documents = Object.entries(this.actions).map(([name, action]) => {
				const text = `Action: ${name}\nDescription: ${action.description}\nParameters: ${Object.entries(action.parameters).map(([paramName, param]) =>
					`${paramName} (${param.type}): ${param.description}`
				).join(', ')
					}`;
				return new Document({ text });
			});

			// Crear y retornar el índice vectorial
			return await VectorStoreIndex.fromDocuments(documents, { serviceContext });
		} catch (error) {
			console.error('Error creating action index:', error);
			throw new Error('Failed to create action index');
		}
	}

	defineAction(name, { description, parameters, handler }) {
		try {
			if (typeof handler !== 'function') {
				throw new Error('Handler must be a function');
			}
			this.actions[name] = { description, parameters, handler };

			// Actualizar el índice cuando se agrega una nueva acción
			if (this.vectorIndex) {
				this.initialize();
			}
		} catch (error) {
			console.error('Error defining action:', error);
			throw new Error('Failed to define action');
		}
	}

	async _interpretRequest(request) {
		try {
			if (!this.vectorIndex) {
				throw new Error('Vector index not initialized');
			}

			// Crear un motor de consulta
			const queryEngine = this.vectorIndex.asQueryEngine();

			// Realizar la consulta
			const response = await queryEngine.query(request);

			// Analizar la respuesta para determinar la acción y los parámetros
			const actionMatch = response.text.match(/Action: (\w+)/);
			if (!actionMatch) {
				throw new Error('No matching action found');
			}

			const actionName = actionMatch[1];
			const action = this.actions[actionName];

			if (!action) {
				throw new Error(`Action ${actionName} not found`);
			}

			// Extraer parámetros de la solicitud
			const params = this._extractParameters(request, action.parameters);

			return {
				name: actionName,
				params
			};
		} catch (error) {
			console.error('Error interpreting request:', error);
			throw new Error('Failed to interpret request');
		}
	}

	_extractParameters(request, parameterDefinitions) {
		// Implementación básica de extracción de parámetros
		const params = {};
		Object.entries(parameterDefinitions).forEach(([paramName, paramDef]) => {
			const regex = new RegExp(`${paramName}[:\\s]+(\\w+)`, 'i');
			const match = request.match(regex);
			if (match) {
				params[paramName] = match[1];
			}
		});
		return params;
	}

	async handleRequest(request) {
		try {
			const action = await this._interpretRequest(request);
			if (action && this.actions[action.name]) {
				return await this.actions[action.name].handler(action.params);
			} else {
				throw new Error('Action not found');
			}
		} catch (error) {
			console.error('Error handling request:', error);
			return 'Lo siento, no pude procesar tu solicitud.';
		}
	}

	getActions() {
		return Object.keys(this.actions);
	}
}

module.exports = new Converso(); 