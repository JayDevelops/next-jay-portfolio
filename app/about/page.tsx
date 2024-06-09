import { Metadata } from "next"
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



export const dynamic = 'force-static'