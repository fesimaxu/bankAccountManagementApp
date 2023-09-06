"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const errorMessages_1 = require("./middleware/errorMessages");
const bankRouter_1 = __importDefault(require("./routes/bankRouter"));
const healthRouter_1 = __importDefault(require("./routes/healthRouter"));
const app = (0, express_1.default)();
const { PORT } = config_1.default;
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Routes
app.use('/', healthRouter_1.default);
app.use('/api', bankRouter_1.default);
// error middlewares
app.all('*', errorMessages_1.error404);
app.use(errorMessages_1.error500);
// active port
const BUILD_PORT = PORT;
// app.listen(BUILD_PORT || ' ', () => {
//     console.log(`Bank Account Management APP running at http://localhost:${BUILD_PORT}/`);
// })
exports.default = app;
