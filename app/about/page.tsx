import { Metadata } from "next";
import { AboutMeHeader } from "@/app/about/AboutMeHeader";
import { WorkExperience } from "@/app/about/WorkExperience";
import SkillsSection from "@/app/about/SkillsSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Jesus Perez summary of his past and his journey to strive to be a great fullstack developer working with the latest modern technologies.",
};

export default function AboutPage() {
  return (
    <div className="p-4">
      <AboutMeHeader />
      <hr className="my-6 border-primary/30 dark:border-primary/30" />
      <WorkExperience />
      <hr className="my-6 border-primary/30 dark:border-primary/30" />
      <SkillsSection />
    </div>
  );
}

export const dynamic = "force-static";
