import { getAllContent, Post } from "@/utils/renderMdxUtils";
import ContentCard from "@/components/ContentCard";

export default async function AllProjectPosts() {
    const projectsDirectory = "/projects";
    let allProjects: Post[] = await getAllContent(projectsDirectory);
    console.log(allProjects)

    return (
        <div className="grid md:grid-cols-3  md:-mx-3">
            <ContentCard contentItems={allProjects} cardType="projects" />
        </div>
    )
}