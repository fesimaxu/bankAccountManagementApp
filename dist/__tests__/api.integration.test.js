"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const testData_1 = require("../utils/testData");
describe("Create a Bank Account Endpoint", () => {
    it("User should be able to create account on the app", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/api/createaccount')
            .send(testData_1.userDetails);
        //test for success
        if (user.statusCode === 200) {
            expect(user.body.message).toBe(`new user ${testData_1.userDetails.accountName} created successfully`);
        }
        else if (!testData_1.userDetails.accountName) {
            expect(user.body.message).toBe(`${testData_1.userDetails.accountName} already exist`);
        }
    }));
    it("The data should be any object", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/createaccount')
            .send(testData_1.user2Details);
        console.log('rsponse', response.body);
        //test for success
        expect(response.body.data).toMatchObject(testData_1.userData);
    }));
    it("The data should be any object with four properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/createaccount')
            .send(testData_1.user3Details);
        //test for success
        const { data } = response.body;
        expect(data).toEqual(expect.objectContaining({
            accountName: expect.any(String),
            accountNumber: expect.any(String),
            accountType: expect.any(String),
            balance: expect.any(Number)
        }));
    }));
});
describe("Resolve a Bank Account Endpoint", () => {
    it("Get Bank details by user's account number", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post('/api/createaccount')
            .send(testData_1.user4Details);
        //test for success
        const userInfo = user.body.data;
        const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get("/api/accounts/accountnumber")
            .send({ accountNumber: userInfo.accountNumber });
        const { data } = body;
        expect(data).toEqual(expect.objectContaining({
            accountName: expect.any(String),
            accountNumber: expect.any(String),
            accountType: expect.any(String),
            balance: expect.any(Number)
        }));
        expect(statusCode).toBe(200);
    }));
});
describe("Fetch All Bank Accounts", () => {
    it("Get Bank all users details", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body, statusCode } = yield (0, supertest_1.default)(app_1.default).get("/api/accounts");
        // console.log('body   ', body)
        const { data } = body;
        expect(data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                accountName: expect.any(String),
                accountNumber: expect.any(String),
                accountType: expect.any(String),
                balance: expect.any(Number)
            })
        ]));
        expect(statusCode).toBe(200);
    }));
});
