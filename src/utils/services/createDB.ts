import fs from "fs";
import path from "path";

//bank file path
export const bankDatabaseFolder = path.join(__dirname, '../../../src/model');
export const bankDatabaseFile = path.join(bankDatabaseFolder, 'bank.json');

// read from database
export const readFromDatabase =  (filePath: string) => {
  return fs.readFileSync( filePath, "utf8")
}

// write to database
export const writeToDatabase =  (filePath: string, datas: any) => {
const stringData = JSON.stringify(datas, null, 2)

   fs.writeFileSync(filePath, stringData, 'utf8');
}

//creating a database if doesn't exist 
export const createDatabase = (databaseFolder: string, databaseFile: string) => {
    if (!fs.existsSync(databaseFolder)) {
          fs.mkdirSync(databaseFolder)
      }
      if (!fs.existsSync(databaseFile)) {
          fs.writeFileSync(databaseFile, " ")
      }
  }