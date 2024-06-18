import {ProjectProps} from "@/lib/contentProps";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Text} from "@/components/ui/Typography/Text";
import {CalendarDaysIcon} from "lucide-react";
import {PostTags} from "@/components/PostTags";

export default function ProjectCard({project}: ProjectProps) {
    return (
        <article className="group relative transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <Card className="shadow-secondary group-hover:shadow-md group-hover:shadow-primary py-2 hover:border-primary">
                <CardHeader>
                    <CardTitle className="group-hover:text-primary group/link">
                        {project.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Text variant="small">{project.summary}</Text>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-4 h-4"/>{project.date}
                </CardFooter>
                <div className="pb-4 px-4">
                    <PostTags tags={project.tags} className="pb-4 mx-4"/>
                </div>
            </Card>
        </article>
    )
}