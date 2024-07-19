import {HeadingOne} from "@/components/ui/Typography/Headers";
import {Text} from "@/components/ui/Typography/Text";
import Link from "next/link";
// import ProjectCard from "@/app/projects/ProjectCard";

export default function ProjectsPage() {
    return (
        <div className="space-y-2 mx-6">
            <HeadingOne color="primary" className="text-left">
                FullStack Projects
            </HeadingOne>
            <Text className="my-2">
                I bring extensive expertise in crafting dynamic web applications using cutting-edge technologies such as Next.js, ReactJS, PHP, and WordPress.
                My proficiency extends to working with advanced tools and databases, including Prisma, React Query, MySQL, and MongoDB.
                My primary focus is on utilizing Next.js in conjunction with ReactJS to develop aesthetically pleasing and highly
                functional web solutions. Check out some featured projects below, and{' '}
                <Link href="/contact" className="underline text-primary hover:outline-primary">contact me</Link> for your next project.
            </Text>

            {/*<div className="py-6 grid md:grid-cols-3">*/}
            {/*    {allProjects.map((project: Project, index: number) => (*/}
            {/*        <ProjectCard key={`project-${index}`} project={project} />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    )
}