"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.inputSchema = zod_1.default.object({
    accountName: zod_1.default.string({
        required_error: "Account name is required"
    }),
    dateOfBirth: zod_1.default.string({
        required_error: "Date of birth is required"
    }),
    accountType: zod_1.default.string({
        required_error: "Date of birth is required"
    }),
    balance: zod_1.default.number({
        required_error: "Number is required"
    }).transform((value) => {
        if (value < 0) {
            throw new Error('Number must be positive');
        }
        return value;
    })
});
