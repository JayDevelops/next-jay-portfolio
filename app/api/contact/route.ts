import { NextRequest, NextResponse} from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

export async function POST(req: NextRequest) {
    const body = await req.json()

    //  Grab the values from the form below
    const { name, email, subject, message } = body

    //  Check if required fields are in our json
    if(!message || !email) {
        return NextResponse.json(
            {error: "Missing required fields!"},
            {status : 400}
        )
    }

    //  Resend declaration with API Key as our parameter
    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
        const { data, error } = await resend.emails.send({
            from: `Jesus - Portfolio <contact@jesusperez.dev>`,
            to: ['swejesusperez@gmail.com'],
            subject: subject,
            react: EmailTemplate({message, email, name, subject})
        })

        if (error) {
            return NextResponse.json(
                { message: "Email sending failed", error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Email sent successfully", data },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { message: "Failed to send email", error },
            { status: 500 }
        );
    }
}