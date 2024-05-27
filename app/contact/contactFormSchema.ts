import {z} from "zod"

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters long."
    }),
    email: z.string().email({
        message: "A valid Email is required so I may contact you back."
    }),
    subject: z.string().min(2, {
        message: "Subject line is required, at least 2 characters long."
    }),
    message: z.string().min(2, {
        message: "Message must be minimum 2 characters long."
    })
})