import z from "zod";



export const inputSchema = z.object({
    accountName: z.string({
        required_error: "Account name is required"
    }),
    dateOfBirth: z.string({
        required_error: "Date of birth is required"
    }),
    accountType: z.string({
        required_error: "Date of birth is required"
    }),
    balance: z.number({
        required_error: "Number is required"
    }).transform((value) => {
        if (value < 0) {
          throw new Error('Number must be positive');
        }
        return value
    })
    
})