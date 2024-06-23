import {HeadingTwo} from "@/components/ui/Typography/Headers";
import {Text} from "@/components/ui/Typography/Text";
import SkillGrid from "@/app/about/SkillGrid";

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
            <SkillGrid />
        </section>
    )
}