"use client"

import { useForm } from "react-hook-form";
import { formSchema } from "./contactFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import SubmitContactButton from "@/app/contact/SubmitContactButton";


export function ContactForm() {
    //  Our toaster component init
    const {toast} = useToast()

    //  Will use our default values to reset and to initiate our form
    const defaultValues = {
        name: "",
        email: "",
        subject: "",
        message: ""
    }

    //  Define our form using from our contactFormSchema and its default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    //  isSending keeps track when the form finishes submitting
    const [isSending, setIsSending] = useState<boolean>(false)


    //  Send the form data to our API point
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            //  Sets sending to true to prevent people from spamming the button while we send the email through our API
            setIsSending(true)

            //  Grab our response and pass our body to send the email via our local API
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    message: data.message,
                    name: data.name,
                    subject: data.subject
                }),
            });

            // handle success
            if (response.ok) {
                //  reset the form with default values, show a success message via toast to user
                toast({
                    title: "Email Sent Successfully!",
                    description: "I will reach back to you as soon as possible."
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "There was a problem sending email. Please try again!.",
                    description: "Otherwise email contact@jesusperez.dev",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "There was a problem sending email. Please try again!.",
                description: "Otherwise email contact@jesusperez.dev",
            })
            console.log("Error sending email:", error);
        } finally {
            //  Reset the form and setIsSending back to false
            setIsSending(false)
            form.reset(defaultValues)
        }
    }

    //  Now we will build our ContactForm to use in our page.tsx
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jesus Perez" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="swejesusperez@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="Subject: I have an opportunity for you..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type your entire message/inquiries/opportunities here and I will get back to you as soon as possible..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitContactButton isSending={isSending} />
            </form>
        </Form>
    )
}