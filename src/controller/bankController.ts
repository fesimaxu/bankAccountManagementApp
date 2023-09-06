import { Request, Response, NextFunction, json } from "express";
import { v4 } from "uuid";
import { inputSchema } from "../utils/validation";
import { AccountDetails } from "../utils/constant/interface";
import {
  
  writeToDatabase,
  readFromDatabase,
  bankDatabaseFile,
} from "../utils/services/createDB";
import { generateAccountNumber, excludeProperties, excludePropertiesFromArray } from "../utils/services/service";

let allBankData: AccountDetails[] = [];

// Create a Bank Account Endpoint
export const createUserAccountDetail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    

    try {

      const storedData = readFromDatabase(bankDatabaseFile);

      if(!storedData){
        return res.status(400).json({
          status: "error",
          message: `Error reading database`,
        })
      }
      allBankData = JSON.parse(storedData);

    } catch (parseError) {
      allBankData = [];
      next(parseError)
    }

    const { accountName, dateOfBirth, accountType, balance } = req.body;

  

    const error = inputSchema.safeParse({
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

    const isExisting = allBankData.find(
      (account: AccountDetails) =>{
        if(account.accountName === accountName){
          return true;
        }
       return false;
      }
    );

    console.log("isExisting", isExisting)

    if (isExisting) {
      res.status(404).json({
        status: "error",
        method: req.method,
        message: `${accountName} already exist`,
      });
    }

    const newAccountNumber = generateAccountNumber();

    const newAccountDetails: AccountDetails = {
      id: v4(),
      accountName,
      accountNumber: newAccountNumber,
      dateOfBirth,
      accountType,
      balance,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const excludeKeys = ["id","dateOfBirth", "createdAt", "updatedAt"];
    const updatedDetails = excludeProperties(newAccountDetails, excludeKeys);

    console.log('updatedDetails', updatedDetails)

    allBankData.push(newAccountDetails);

    writeToDatabase(bankDatabaseFile, allBankData);

    res.status(200).json({
      status: "success",
      method: req.method,
      message: `new user ${accountName} created successfully`,
      data: updatedDetails

    });
  } catch (error) {
    console.log(error)
  }
};


// Resolve a Bank Account Endpoint
export const getAccountDetailsByAccountNumber = (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  const { accountNumber } = req.body;

  const data = readFromDatabase(bankDatabaseFile);

  if (!data) {
    return res.status(400).json({
      status: "error",
      method: req.method,
      message: "Database is empty",
    });
  }

  allBankData = JSON.parse(data);

  const isExisting = allBankData.filter((account: AccountDetails) => {

    return account.accountNumber === accountNumber
  })

 

  if (isExisting.length === 0) {
    res.status(404).send({
      status: "error",
      method: req.method,
      message: `${accountNumber} not found`,
    });
  }

  let dataByAccountNumber;

 for(let accountOwner of isExisting){
  dataByAccountNumber = accountOwner;
 }

 const excludeKeys = ["id","dateOfBirth", "createdAt", "updatedAt"];
  const updatedDetails = excludeProperties(dataByAccountNumber, excludeKeys);


  res.status(200).json({
    status: "success",
    method: req.method,
    message: `${dataByAccountNumber?.accountName} details successfully found`,
    data: updatedDetails
  })


};



// Fetch All Bank Accounts
export const getAllAcountDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const data = readFromDatabase(bankDatabaseFile);

  if (!data) {
    return res.status(400).json({
      status: "error",
      method: req.method,
      message: "Database is empty",
    });
  }

  allBankData = JSON.parse(data);

  const excludeKeys = ["id","dateOfBirth", "createdAt", "updatedAt"];
  const updatedDetails = excludePropertiesFromArray(allBankData, excludeKeys);

  res.status(200).json({
    status: "success",
    method: req.method,
    message: "all account details successfully found",
    data: updatedDetails
  });
};


export const apiHealthCheck = (req: Request, res: Response, next: NextFunction) => {

  const healthCheckApi = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try {
      res.send(healthCheckApi)
    } catch (error) {
      next(error)
    }
}