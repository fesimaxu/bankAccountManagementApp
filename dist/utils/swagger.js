"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "oAuth API Docs",
            description: "oAuthentication 2.0 API ",
            version: "1.0.0"
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "production server"
            },
            {
                url: "http://localhost:5000",
                description: "development server"
            },
        ]
    },
    security: [
        {
            bearerAuth: []
        }
    ],
    // looks for configuration in specified directories
    apis: ["../../dist/app.js'"]
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (req, res, next) => {
    try {
        res.setHeader("Content-Type", "application/json");
        res.send(exports.swaggerSpec);
    }
    catch (error) {
        next(error);
    }
};
exports.swaggerDocs = swaggerDocs;
