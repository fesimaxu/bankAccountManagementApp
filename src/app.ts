import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import config from "./config";
import { error404, error500 } from "./middleware/errorMessages";
import bankRouter from "./routes/bankRouter";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./utils/swagger";

const app = express();

const { PORT } = config;

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api', bankRouter);


// error middlewares
app.all('*', error404);
app.use(error500);

// swagger server
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}));


// active port
const BUILD_PORT = PORT;


app.listen(BUILD_PORT || ' ', () => {

    console.log(`Bank Account Management APP running at http://localhost:${BUILD_PORT}/`);
    console.log(`Docs available at http://localhost:${BUILD_PORT}/api-doc`);
})



export default app;