"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludePropertiesFromArray = exports.excludeProperties = exports.generateAccountNumber = void 0;
const generateAccountNumber = () => {
    const prefix = '015';
    const num = Math.floor(1000000 + Math.random() * 9000);
    const accountName = `${prefix + num}`;
    return accountName;
};
exports.generateAccountNumber = generateAccountNumber;
function excludeProperties(obj, keysToExclude) {
    const newObj = Object.assign({}, obj);
    for (const key of keysToExclude) {
        if (newObj.hasOwnProperty(key)) {
            delete newObj[key];
        }
    }
    return newObj;
}
exports.excludeProperties = excludeProperties;
function excludePropertiesFromArray(arr, keysToExclude) {
    return arr.map((obj) => {
        const newObj = Object.assign({}, obj);
        for (const key of keysToExclude) {
            if (newObj.hasOwnProperty(key)) {
                delete newObj[key];
            }
        }
        return newObj;
    });
}
exports.excludePropertiesFromArray = excludePropertiesFromArray;
