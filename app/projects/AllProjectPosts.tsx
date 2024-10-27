import { getAllContent, Post } from "@/utils/renderMdxUtils";
import ContentCard from "@/components/ContentCard";

export default async function AllProjectPosts() {
    const projectsDirectory = "/projects";
    let allProjects: Post[] = await getAllContent(projectsDirectory);

    // Sort projects by date in descending order (newest first)
    const sortedProjects: Post[] = allProjects.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return (
        <div className="md:-mx-3">
            <ContentCard
                contentItems={sortedProjects} // Pass sorted projects
                cardType="projects"
                className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            />
        </div>
    )
}
