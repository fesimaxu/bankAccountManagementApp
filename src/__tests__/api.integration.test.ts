import supertest from "supertest";
import app from "../app";
import { userData, userDetails, user2Details, user3Details, user4Details } from "../utils/testData";


describe("Create a Bank Account Endpoint", ()=>{

    it("User should be able to create account on the app", async ()=>{
        const user =  await supertest(app).post('/api/createaccount')
            .send(userDetails)
    
            //test for success
            if( user.statusCode === 200){
            expect(user.body.message).toBe( `new user ${userDetails.accountName} created successfully`)
            }else if(!userDetails.accountName){
            expect(user.body.message).toBe( `${userDetails.accountName} already exist`)
            }

            
    })

    it("The data should be any object", async ()=>{
        const response =  await supertest(app).post('/api/createaccount')
            .send(user2Details)
            console.log('rsponse',response.body)
    
            //test for success
            expect(response.body.data).toMatchObject(userData);
    })

    it("The data should be any object with four properties", async ()=>{

        
        const response =  await supertest(app).post('/api/createaccount')
            .send(user3Details)
    
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

        const user =  await supertest(app).post('/api/createaccount')
        .send(user4Details)

    
        //test for success
        const userInfo = user.body.data
    

        const { body, statusCode } = await supertest(app).get("/api/accounts/accountnumber")
        .send({accountNumber: userInfo.accountNumber})

       

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
    it("Get Bank all users details", async () => {

        const { body, statusCode } = await supertest(app).get("/api/accounts")

        // console.log('body   ', body)

        const { data } = body
        expect(data).toEqual(
        expect.arrayContaining([
            
                expect.objectContaining({
                    accountName: expect.any(String),
                    accountNumber: expect.any(String),
                    accountType: expect.any(String),
                    balance: expect.any(Number)
                })
            
        ])
        )

        expect(statusCode).toBe(200);
    })
})
