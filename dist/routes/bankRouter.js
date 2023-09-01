"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bankController_1 = require("../controller/bankController");
const router = (0, express_1.Router)();
router.post('/createaccount', bankController_1.createUserAccountDetail);
router.get('/accounts', bankController_1.getAllAcountDetails);
router.get('/accounts/accountnumber', bankController_1.getAccountDetailsByAccountNumber);
exports.default = router;
