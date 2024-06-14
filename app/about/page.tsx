import { Metadata } from "next"
import {AboutMeHeader} from "@/app/about/AboutMeHeader"
import {WorkExperience} from "@/app/about/WorkExperience";

export const metadata: Metadata = {
    title: "Work",
    description: "Jesus Perez summary of his past and his journey to strive to be a great fullstack developer working with the latest modern technologies."
}

export default function AboutPage() {
    return (
        <div className="mx-auto flex h-full min-h-screen max-w-4xl flex-col gap-5 p-5 sm:p-10">
            <AboutMeHeader/>
            <hr className="my-3 border-primary/30 dark:border-primary/30"/>
            <WorkExperience/>
        </div>
    )
}


export const dynamic = 'force-static'