import {Post} from "@/utils/renderMdxUtils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { ProjectLink, projectLinks } from "@/app/projects/projectsLinks";
import {cn} from "@/lib/utils";

export function ProjectLinks({post, className}: {post: Post, className?: string}) {
    return (
        <div className={cn(className)}>
            {projectLinks.map((projectLink: ProjectLink, index: number) => (
                <div key={`link-${index}`} className="flex space-x-4">
                    {projectLink.title === post.metadata.title ? (
                        <Button variant="outline" asChild>
                            <Link href={`${projectLink.githubLink}`} target="_blank">GitHub</Link>
                        </Button>
                    ) : null}
                    {projectLink.title === post.metadata.title ? (
                        <Button variant="outline" asChild>
                            <Link href={`${projectLink.githubLink}`} target="_blank">View Live</Link>
                        </Button>
                    ): null}
                </div>
            ))}
        </div>
    )
}