import { getAllContent, Post } from "@/utils/renderMdxUtils";
import ContentCard from "@/components/ContentCard";

export default async function AllProjectPosts() {
    const projectsDirectory = "/projects";
    const allProjects: Post[] = await getAllContent(projectsDirectory);

    return (
        <div className="md:-mx-3">
            <ContentCard
                contentItems={allProjects}
                cardType="projects"
                className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            />
        </div>
    )
}