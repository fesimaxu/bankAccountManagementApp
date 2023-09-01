"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bankController_1 = require("../controller/bankController");
const router = (0, express_1.Router)();
router.get('/', bankController_1.apiHealthCheck);
exports.default = router;
