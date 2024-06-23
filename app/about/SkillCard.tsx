import {Skill} from "@/app/about/SkillGrid";
import {HeadingThree} from "@/components/ui/Typography/Headers";

export default function SkillCard({skill}: {skill: Skill}) {
    return (
        <div
            title={skill.title}
            className="flex items-center justify-center sm:justify-start gap-4 relative rounded-lg bg-secondary p-4 duration-300 ease-in-out hover:scale-[1.02]"
        >
            <div className="relative">
                {skill.icon}
            </div>

            <HeadingThree className="text-secondary-foreground">
                {skill.title}
            </HeadingThree>
        </div>
    )
}