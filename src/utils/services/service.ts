import { AccountDetails } from "../constant/interface";

export const generateAccountNumber = () => {

    const prefix = '015';
  
      const num = Math.floor(1000000 + Math.random() * 9000);
  
    const accountName = `${prefix + num}`
  
    return accountName;
  
  }



 export function excludeProperties(obj: any, keysToExclude: any) {
    const newObj = { ...obj };
    for (const key of keysToExclude) {
      if (newObj.hasOwnProperty(key)) {
        delete newObj[key];
      }
    }
    return newObj;
  }


export  function excludePropertiesFromArray(arr: any, keysToExclude: any) {
    return arr.map((obj: any) => {
      const newObj = { ...obj };
      for (const key of keysToExclude) {
        if (newObj.hasOwnProperty(key)) {
          delete newObj[key];
        }
      }
      return newObj;
    });
  }