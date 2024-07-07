import {HeadingOne, HeadingThree} from "@/components/ui/Typography/Headers";
import {ContactForm} from "@/app/contact/ContactForm";
import Earth from "@/components/Models/Earth/Earth";
import Link from "next/link";
import {LinkedinIcon, XIcon} from "lucide-react";
import {InstagramLogoIcon} from "@radix-ui/react-icons";

export default function Contact() {
    return (
        <div className="mx-8">
            <div className="space-y-4">
                <HeadingOne>
                    Open to <span className="text-primary">Build and Ship</span>
                </HeadingOne>
                <HeadingThree>
                    Have an <span className="text-primary">exciting</span> project/product you need help with?
                    <br />
                    Fill out the contact form or reach out to me through the platforms below!
                </HeadingThree>

                <SocialLinks />
            </div>

            <div className="grid md:grid-cols-2 space-x-4">
                <ContactForm />
                <Earth />
            </div>
        </div>
    )
}

function SocialLinks() {
    return (
        <div className="flex justify-center gap-4 p-4 md:mx-64 bg-secondary/20 rounded-full shadow-lg shadow-secondary backdrop-blur-lg bg-opacity-50">
            <Link
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
                href="https://www.linkedin.com/in/jesusperezarias"
            >
                <LinkedinIcon className="h-5 w-5" />
                <span className="text-sm font-medium">LinkedIn</span>
            </Link>

            <Link
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
                href="https://twitter.com/jay_develops"
            >
                <XIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Twitter/X</span>
            </Link>

            <Link
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
                href="https://www.instagram.com/jay.develops"
            >
                <InstagramLogoIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Instagram</span>
            </Link>
        </div>
    )
}