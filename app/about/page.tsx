import { Metadata } from "next"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {DownloadIcon} from "@radix-ui/react-icons"
import {AboutMeHeader} from "@/app/about/AboutMeHeader"

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