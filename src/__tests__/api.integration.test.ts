import supertest from "supertest";
import app from "../app";
import { userData, userDetails } from "../utils/testData";


describe("Create a Bank Account Endpoint", ()=>{

    it("User should be able to create account of the app", async ()=>{
        const user =  await supertest(app).post('/bank/createaccount')
            .send(userDetails)
    
            //test for success
            if( user.statusCode === 200){
            expect(user.body.message).toBe( `new user ${userDetails.accountName} created successfully`)
            }else if(!userDetails.accountName){
            expect(user.body.message).toBe( `${userDetails.accountName} already exist`)
            }
    })

    it("The data should be any object", async ()=>{
        const response =  await supertest(app).post('/bank/createaccount')
            .send(userDetails)
    
            //test for success
            expect(response.body.data).toMatchObject(userData);
    })

    it("The data should be any object with four properties", async ()=>{

        
        const response =  await supertest(app).post('/bank/createaccount')
            .send(userDetails)
    
            //test for success
            const { data } = response.body

            expect(data).toEqual(
                expect.objectContaining({
                    accountName: expect.any(String),
                    accountNumber: expect.any(String),
                    accountType: expect.any(String),
                    balance: expect.any(Number)
                })
            )
    })
})


describe("Resolve a Bank Account Endpoint", () =>{
    it("Get Bank details by user's account number", async () => {

        const user =  await supertest(app).post('/bank/createaccount')
        .send(userDetails)

        //test for success
        const userInfo = user.body.data

        const { body, statusCode } = await supertest(app).get("bank/accounts/accountnumber")
        .send(userInfo.accountName);

        const { data } = body
     
        expect(data).toEqual(
            expect.objectContaining({
                accountName: expect.any(String),
                accountNumber: expect.any(String),
                accountType: expect.any(String),
                balance: expect.any(Number)
            })
        )

        expect(statusCode).toBe(200);
    })
})


describe("Fetch All Bank Accounts", () =>{
    it("Get Bank all user's details", async () => {

        const { body, statusCode } = await supertest(app).get("bank/accounts")

        const { data } = body
        expect.arrayContaining([
            expect(data).toEqual(
                expect.objectContaining({
                    accountName: expect.any(String),
                    accountNumber: expect.any(String),
                    accountType: expect.any(String),
                    balance: expect.any(Number)
                })
            )
        ])
      

        expect(statusCode).toBe(200);
    })
})
