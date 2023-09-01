import { Request, Response, NextFunction, json } from "express";
import { v4 } from "uuid";
import { inputSchema } from "../utils/validation";
import { AccountDetails } from "../utils/constant/interface";
import {
  createDatabase,
  writeToDatabase,
  readFromDatabase,
  bankFolder,
  bankFile,
} from "../utils/services/createDB";
import { generateAccountNumber, excludeProperties, excludePropertiesFromArray } from "../utils/services/service";

export const createUserAccountDetail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let bankData: AccountDetails[] = [];

    const { accountName, dateOfBirth, accountType, balance } = req.body;


    const validateInput = inputSchema.parse({
      accountName,
      dateOfBirth,
      accountType,
      balance,
    });

    if (!validateInput) {
      return res.status(400).json({
        status: "error",
        method: req.method,
        message: "Invalid input details",
      });
    }

    const isExisting = bankData.find(
      (account: AccountDetails) => account.accountName === accountName
    );

    if (isExisting) {
      res.status(404).send({
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

    bankData.push(newAccountDetails);

    writeToDatabase(bankFile, bankData);

    res.status(200).json({
      status: "success",
      method: req.method,
      message: `new user ${accountName} created successfully`,
      data: updatedDetails

    });
  } catch (error) {
    next(error);
  }
};

export const getAllAcountDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let bankData: AccountDetails[] = [];

  const data = readFromDatabase(bankFile);

  if (!data) {
    return res.status(400).json({
      status: "error",
      method: req.method,
      message: "Database is empty",
    });
  }

  bankData = JSON.parse(data);

  const excludeKeys = ["id","dateOfBirth", "createdAt", "updatedAt"];
  const updatedDetails = excludePropertiesFromArray(bankData, excludeKeys);

  res.status(200).json({
    status: "success",
    method: req.method,
    message: "all account details successfully found",
    data: updatedDetails,
  });
};

export const getAccountDetailsByAccountNumber = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

 
  const { accountNumber } = req.body;

  let bankData: AccountDetails[] = [];

  const data = readFromDatabase(bankFile);

  if (!data) {
    return res.status(400).json({
      status: "error",
      method: req.method,
      message: "Database is empty",
    });
  }

  bankData = JSON.parse(data);

  const isExisting = bankData.filter((account: AccountDetails) => {

    return account.accountNumber === accountNumber
  })

  console.log(isExisting)

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
