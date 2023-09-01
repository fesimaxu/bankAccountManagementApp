import { Router } from "express";
import { apiHealthCheck } from "../controller/bankController";



const router = Router();


router.get('/', apiHealthCheck);



export default router;