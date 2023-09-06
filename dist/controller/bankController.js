"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiHealthCheck = exports.getAllAcountDetails = exports.getAccountDetailsByAccountNumber = exports.createUserAccountDetail = void 0;
const uuid_1 = require("uuid");
const validation_1 = require("../utils/validation");
const createDB_1 = require("../utils/services/createDB");
const service_1 = require("../utils/services/service");
let allBankData = [];
// Create a Bank Account Endpoint
const createUserAccountDetail = (req, res, next) => {
    try {
        try {
            const storedData = (0, createDB_1.readFromDatabase)(createDB_1.bankDatabaseFile);
            if (!storedData) {
                return res.status(400).json({
                    status: "error",
                    message: `Error reading database`,
                });
            }
            allBankData = JSON.parse(storedData);
        }
        catch (parseError) {
            allBankData = [];
            next(parseError);
        }
        const { accountName, dateOfBirth, accountType, balance } = req.body;
        const error = validation_1.inputSchema.safeParse({
            accountName,
            dateOfBirth,
            accountType,
            balance,
        });
        if (error.success === false) {
            return res.status(400).send({
                status: "error",
                method: req.method,
                message: error.error.issues
            });
        }
        const isExisting = allBankData.find((account) => {
            if (account.accountName === accountName) {
                return true;
            }
            return false;
        });
        console.log("isExisting", isExisting);
        if (isExisting) {
            res.status(404).json({
                status: "error",
                method: req.method,
                message: `${accountName} already exist`,
            });
        }
        const newAccountNumber = (0, service_1.generateAccountNumber)();
        const newAccountDetails = {
            id: (0, uuid_1.v4)(),
            accountName,
            accountNumber: newAccountNumber,
            dateOfBirth,
            accountType,
            balance,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const excludeKeys = ["id", "dateOfBirth", "createdAt", "updatedAt"];
        const updatedDetails = (0, service_1.excludeProperties)(newAccountDetails, excludeKeys);
        console.log('updatedDetails', updatedDetails);
        allBankData.push(newAccountDetails);
        (0, createDB_1.writeToDatabase)(createDB_1.bankDatabaseFile, allBankData);
        res.status(200).json({
            status: "success",
            method: req.method,
            message: `new user ${accountName} created successfully`,
            data: updatedDetails
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createUserAccountDetail = createUserAccountDetail;
// Resolve a Bank Account Endpoint
const getAccountDetailsByAccountNumber = (req, res, next) => {
    const { accountNumber } = req.body;
    const data = (0, createDB_1.readFromDatabase)(createDB_1.bankDatabaseFile);
    if (!data) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: "Database is empty",
        });
    }
    allBankData = JSON.parse(data);
    const isExisting = allBankData.filter((account) => {
        return account.accountNumber === accountNumber;
    });
    if (isExisting.length === 0) {
        res.status(404).send({
            status: "error",
            method: req.method,
            message: `${accountNumber} not found`,
        });
    }
    let dataByAccountNumber;
    for (let accountOwner of isExisting) {
        dataByAccountNumber = accountOwner;
    }
    const excludeKeys = ["id", "dateOfBirth", "createdAt", "updatedAt"];
    const updatedDetails = (0, service_1.excludeProperties)(dataByAccountNumber, excludeKeys);
    res.status(200).json({
        status: "success",
        method: req.method,
        message: `${dataByAccountNumber === null || dataByAccountNumber === void 0 ? void 0 : dataByAccountNumber.accountName} details successfully found`,
        data: updatedDetails
    });
};
exports.getAccountDetailsByAccountNumber = getAccountDetailsByAccountNumber;
// Fetch All Bank Accounts
const getAllAcountDetails = (req, res, next) => {
    const data = (0, createDB_1.readFromDatabase)(createDB_1.bankDatabaseFile);
    if (!data) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: "Database is empty",
        });
    }
    allBankData = JSON.parse(data);
    const excludeKeys = ["id", "dateOfBirth", "createdAt", "updatedAt"];
    const updatedDetails = (0, service_1.excludePropertiesFromArray)(allBankData, excludeKeys);
    res.status(200).json({
        status: "success",
        method: req.method,
        message: "all account details successfully found",
        data: updatedDetails
    });
};
exports.getAllAcountDetails = getAllAcountDetails;
const apiHealthCheck = (req, res, next) => {
    const healthCheckApi = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthCheckApi);
    }
    catch (error) {
        next(error);
    }
};
exports.apiHealthCheck = apiHealthCheck;
