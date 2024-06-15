import {HeadingOne} from "@/components/ui/Typography/Headers";
import {ContactForm} from "@/app/contact/ContactForm";
import Earth from "@/components/Models/Earth/Earth";

export default function Contact() {
    return (
        <div>
            <HeadingOne>Contact Page</HeadingOne>

            <div className="grid md:grid-cols-2 space-x-4">
                <ContactForm />
                <Earth />
            </div>
        </div>
    )
}