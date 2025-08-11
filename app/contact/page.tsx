import { HeadingOne, HeadingThree } from "@/components/ui/Typography/Headers";
import { ContactForm } from "@/app/contact/ContactForm";
import Link from "next/link";
import { LinkedinIcon, XIcon } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";

export default function Contact() {
  const DynamicEarth = dynamic(
    () => import("@/components/Models/Earth/Earth"),
    {
      loading: () => <p>Loading...</p>,
    }
  );

  return (
    <div className="p-4">
      <div className="space-y-4">
        <HeadingOne>
          Open to <span className="text-primary">Build and Ship</span>
        </HeadingOne>
        <HeadingThree>
          Have an <span className="text-primary">exciting</span> project/product
          you need help with?
          <br />
          Fill out the contact form or reach out to me through the platforms
          below!
        </HeadingThree>

        <SocialLinks />
      </div>

      <div className="grid md:grid-cols-2 space-x-4">
        <ContactForm />
        <DynamicEarth />
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex justify-center gap-4 p-4 md:mx-64 bg-secondary/20 rounded-full shadow-lg shadow-secondary backdrop-blur-lg bg-opacity-50">
      <Link
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
        href="https://www.linkedin.com/in/jesusperezarias"
        target="_blank"
      >
        <LinkedinIcon className="h-5 w-5" />
        <span className="text-sm font-medium">LinkedIn</span>
      </Link>
      <Link
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
        href="https://twitter.com/jay_develops"
        target="_blank"
      >
        <XIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Twitter/X</span>
      </Link>
      <Link
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
        href="https://www.instagram.com/jay.develops"
        target="_blank"
      >
        <InstagramLogoIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Instagram</span>
      </Link>
    </div>
  );
}
