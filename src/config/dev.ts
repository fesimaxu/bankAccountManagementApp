import dotenv from "dotenv";

dotenv.config();

const { DEV_PORT  } = process.env;


export default {
    PORT: DEV_PORT
};


console.log("running in development mode");