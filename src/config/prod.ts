import dotenv from "dotenv";

dotenv.config();

const { PROD_PORT } = process.env;



export default {
    PORT: PROD_PORT
};



console.log("running in production mode");