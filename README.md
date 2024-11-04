# Converso.js

Converso.js es un framework que permite integrar interacciones conversacionales con modelos de lenguaje en aplicaciones de JavaScript. Facilita la creación de interfaces conversacionales para que los usuarios puedan interactuar con tu aplicación mediante lenguaje natural, mejorando la experiencia de usuario y accesibilidad.

## Características

- **Definición de Acciones Conversacionales**: Declara acciones personalizadas con descripciones y parámetros específicos.
- **Integración Simple**: Compatible con cualquier proyecto de JavaScript o Node.js.
- **Respuestas Contextuales**: Utiliza el poder de LlamaIndex para interpretar y responder a comandos de manera precisa.
- **Procesamiento Vectorial**: Implementa índices vectoriales para una mejor comprensión del contexto.
- **Manejo Robusto de Errores**: Sistema completo de gestión de errores para mantener la estabilidad.

## Instalación

Instala Converso.js usando npm:

```
npm install converso.js
```

## Uso Básico

Define una acción conversacional en tu aplicación:

```javascript
const Converso = require('converso.js');

Converso.defineAction('CheckWeather', {
  description: 'Retrieve the weather forecast for a specified location',
  parameters: {
    location: {
      type: 'string',
      description: 'The location to get the weather for'
    }
  },
  handler: async (params) => {
    // Lógica para obtener el pronóstico del clima
    return await getWeatherForLocation(params.location);
  }
});

// Procesar una solicitud de lenguaje natural
const userRequest = '¿Cómo está el clima en Tokio?';
Converso.handleRequest(userRequest).then(response => {
  console.log(response); // Salida: "El clima en Tokio es..."
});
```

## Documentación

Definir una Acción

Cada acción tiene una descripción y un conjunto de parámetros. Se define utilizando Converso.defineAction():

```javascript
Converso.defineAction('NombreDeAccion', {
  description: 'Breve descripción de la acción',
  parameters: {
    nombreParametro: {
      type: 'tipo',
      description: 'Descripción del parámetro'
    }
  },
  handler: async (params) => {
    // Lógica personalizada de la acción
  }
});
```

### Procesar Solicitudes

Utiliza Converso.handleRequest() para procesar comandos de lenguaje natural:

```javascript
Converso.handleRequest('Comando de ejemplo').then(response => {
  console.log(response);
});
```

## API General

### Converso.defineAction()
Define una acción conversacional.

```javascript
Converso.defineAction('NombreDeAccion', {
  // ...
});
```

### Converso.handleRequest()

Procesa una solicitud de lenguaje natural y devuelve una respuesta.

### Converso.getActions()

Devuelve un array con todas las acciones definidas.

```javascript
const actions = Converso.getActions();
console.log(actions);
```


## Contribuir

Las contribuciones son bienvenidas. Por favor, sigue las guías de contribución y mantén el estilo de código consistente.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
