"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = exports.writeToDatabase = exports.readFromDatabase = exports.bankDatabaseFile = exports.bankDatabaseFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//bank file path
exports.bankDatabaseFolder = path_1.default.join(__dirname, '../../../src/model');
exports.bankDatabaseFile = path_1.default.join(exports.bankDatabaseFolder, 'bank.json');
// read from database
const readFromDatabase = (filePath) => {
    return fs_1.default.readFileSync(filePath, "utf8");
};
exports.readFromDatabase = readFromDatabase;
// write to database
const writeToDatabase = (filePath, datas) => {
    const stringData = JSON.stringify(datas, null, 2);
    fs_1.default.writeFileSync(filePath, stringData, 'utf8');
};
exports.writeToDatabase = writeToDatabase;
//creating a database if doesn't exist 
const createDatabase = (databaseFolder, databaseFile) => {
    if (!fs_1.default.existsSync(databaseFolder)) {
        fs_1.default.mkdirSync(databaseFolder);
    }
    if (!fs_1.default.existsSync(databaseFile)) {
        fs_1.default.writeFileSync(databaseFile, " ");
    }
};
exports.createDatabase = createDatabase;
