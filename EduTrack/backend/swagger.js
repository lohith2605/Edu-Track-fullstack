const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'EduTrack API Documentation',
    version: '1.0.0',
    description: 'RESTful API docs for EduTrack – Student Management System',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Scan all route files for annotations (optional for advanced usage)
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
