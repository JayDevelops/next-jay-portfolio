import {HeadingFour, HeadingTwo} from "@/components/ui/Typography/Headers";
import {Text} from "@/components/ui/Typography/Text";
import {Skill} from "@/app/about/skills";
import {skills} from "@/app/about/skills";

export default function SkillsSection() {
    return (
        <section className="skills-experience-section my-2">
            <article>
                <HeadingTwo color="primary">
                    Skills
                </HeadingTwo>
                <div className="text-container space-y-4">
                    <Text>
                        I&apos;m on a mission to create products where users, developers, and business all love.
                        Currently working as a fullstack developer yet trying to break into Design Engineering where
                        I can create delightful user experiences while maintaining excellent functionality.
                    </Text>
                    <Text>
                        Currently experienced with a focus on modern fullstack web development applications and dabbling in mobile SwiftUI applications,
                        crafting unique experiences users enjoy using daily from taking intense care of concept to the product lifecycle.
                    </Text>
                </div>
            </article>

            <div className="grid my-8 gap-4 grid-cols-2 md:grid-cols-3">
                {skills.map((skill: Skill, index: number) => (
                    <SkillCard key={index} skill={skill}/>
                ))}
            </div>
        </section>
    )
}

export function SkillCard({skill}: {skill: Skill}) {
    return (
        <div
            title={skill.title}
            className="flex items-center justify-center sm:justify-start gap-4 relative rounded-lg bg-secondary p-4 duration-300 ease-in-out hover:scale-[1.02]"
        >
            <div className="relative">
                {skill.icon}
            </div>

            <HeadingFour className="text-secondary-foreground">
                {skill.title}
            </HeadingFour>
        </div>
    )
}
