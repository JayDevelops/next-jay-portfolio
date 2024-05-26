import {z} from "zod"

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters long."
    }),
    email: z.string().email({
        message: "A valid Email is required so I may email you back :)."
    }),
    body: z.string().min(2, {
        message: ""
    })
})