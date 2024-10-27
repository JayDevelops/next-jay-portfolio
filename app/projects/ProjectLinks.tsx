import {Post} from "@/utils/renderMdxUtils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { ProjectLink, projectLinks } from "@/app/projects/projectsLinks";
import {cn} from "@/lib/utils";
import React from "react";

export function ProjectLinks({ post, className }: { post: Post, className?: string }) {
    return (
        <div className={cn("mt-5 space-x-4", className)}>
            {projectLinks.map((projectLink: ProjectLink, index: number) => (
                projectLink.title === post.metadata.title && (
                    <React.Fragment key={`link-${index}`}>
                        {projectLink.githubLink && (
                            <Button variant="outline" className="w-full md:w-auto" asChild>
                                <Link href={projectLink.githubLink} target="_blank">
                                    GitHub
                                </Link>
                            </Button>
                        )}
                        {projectLink.liveLink && (
                            <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0" asChild>
                                <Link href={projectLink.liveLink} target="_blank">
                                    View Live
                                </Link>
                            </Button>
                        )}
                    </React.Fragment>
                )
            ))}
        </div>
    );
}