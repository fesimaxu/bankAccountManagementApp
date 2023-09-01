import { Router } from "express";
import { createUserAccountDetail, getAccountDetailsByAccountNumber, getAllAcountDetails } from "../controller/bankController";



const router = Router();



router.post('/createaccount', createUserAccountDetail);
router.get('/accounts', getAllAcountDetails);
router.get('/accounts/accountnumber', getAccountDetailsByAccountNumber);



export default router;