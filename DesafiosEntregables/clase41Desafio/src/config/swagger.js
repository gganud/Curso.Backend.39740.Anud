import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerTheme } from 'swagger-themes';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Ecommerce Api Documentation',
            description: "Api Documentation with Swagger",
            contact: {
                name: "Gastón Anud",
                url: "https://github.com/gganud/Curso.Backend.39740.Anud",
                email: "gastonanud@gmail.com",
            }
        }
    },
    apis: ['./docs/**/*.yaml']
};
export const specs = swaggerJsdoc(swaggerOptions)
const theme = new SwaggerTheme('v3');
export const options = {
    explorer: false,
    customCss: theme.getBuffer('dark')
};
