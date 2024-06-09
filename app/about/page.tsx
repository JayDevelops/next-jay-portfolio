import { Metadata } from "next"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {DownloadIcon} from "@radix-ui/react-icons";

export const metadata: Metadata = {
    title: "Work",
    description: "Jesus Perez summary of his past and his journey to strive to be a great fullstack developer working with the latest modern technologies."
}

export default function AboutPage() {
    return (
        <div className="space-y-4 container-lg md:mx-6 md:mt-3">
            <AboutMeHeader />
        </div>
    )
}

export function AboutMeHeader() {
    return (
        <article className="prose dark:prose-invert">
            <h1>
                Hello my name is <span className="text-primary">Jesus Perez</span> but
                everyone calls me <span className="text-primary">Jay.</span>
            </h1>

            <p>
                My parents come from Michoacan, Mexico (not Michigan) came to Southern California in the
                1990&apos;s, where I currently
                reside in Montebello, California. I bring extensive expertise in crafting dynamic web applications
                using cutting-edge technologies
                such as Next.js, ReactJS, PHP, ASP.NET, Wordpress and various more in my four plus years of being a
                FullStack Developer.
            </p>

            <p>
                Back in my high school days I was enrolled in a&nbsp;<Link href="https://www.mhscats.com/">creative
                arts pathway program</Link> dedicated to animation and graphic design, from there I fell in love with
                design where I wanted to create web design. My animation teacher set me aside showing
                me his personal portfolio with some fancy jQuery animations.
            </p>

            <p>
                Peaking my curiosity into JavaScript land where I wrote my first line of JavaScript code, fast forward to today
                and the long and continuing path of pursuing my Bachelors in Computer Science and various roles to being a FullStack
                Developer widens,&nbsp;<Link href="/contact">contact me</Link> to bring me aboard to assist the shipping of your next
                product.
            </p>
            <DownloadResumeButton />
        </article>
    )
}

export function DownloadResumeButton() {
    return (
        <Button asChild variant="outline">
            <Link href="/static/Jesus_Perez_SoftwareEngineer2024.pdf" target="_blank">
                Download Resume&nbsp;<DownloadIcon />
            </Link>
        </Button>
    )
}

export const dynamic = 'force-static'