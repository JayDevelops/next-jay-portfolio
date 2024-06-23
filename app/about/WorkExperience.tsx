import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {HeadingFive, HeadingFour, HeadingThree, HeadingTwo} from "@/components/ui/Typography/Headers";
import {Text} from "@/components/ui/Typography/Text";

export function WorkExperience() {
    return (
        <section className="work-experience-section my-2">
            <article>
                <HeadingTwo color="primary">
                    Experience
                </HeadingTwo>
                <Text>
                    I&apos;m on a mission to create products where users, developers, and business all love.
                    Currently working as a fullstack developer yet trying to break into Design Engineering where
                    I can create delightful user experiences while maintaining excellent functionality.
                </Text>
            </article>

            <div className="mx-auto">
                {experiences.map((experience: Experience, index: number) => (
                    <ExperienceCard key={index} experience={experience}/>
                ))}
            </div>
        </section>
    )
}

export function ExperienceCard({experience}: { experience: Experience }) {
    return (
        <article className="py-4 group relative">
            <Card
                className="shadow-secondary group-hover:shadow-md group-hover:shadow-secondary py-2 hover:border-primary"
            >
                <CardHeader>
                    <div>
                        <HeadingThree className="group-hover:text-primary group/link">
                            {experience.company}
                        </HeadingThree>
                        <HeadingFive color="muted-foreground">
                            {experience.role}, {experience.date}
                        </HeadingFive>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc space-y-2 mx-4">
                        {experience.marks.map((eachMark, index) => (
                            <li key={`${eachMark}-${index}`}>
                                {eachMark}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </article>
    )
}

interface Experience {
    company: string,
    role: string,
    date: string,
    marks: string[]
}

const experiences: Experience[] = [
    {
        company: "Superior Press",
        role: "Jr. Software Developer",
        date: "2024-Present",
        marks: [
            "I joined Superior in 2024 " +
            "to maintain and create modern solutions for internal use and to delight customers, " +
            "looking for innovative tech solutions to fulfill the needs of the company.",
            "Maintaining and developing with ASP.NET MVC architecture to focusing on creating " +
            "order fulfillment while ensuring high level of security, and creating pleasing interfaces with jQuery.",
            "Responsible for developing, testing, debugging, and maintaining organizational requirements " +
            "while working in an Agile SCRUM environment all while juggling with different staff, management, contractors, and " +
            "identifying their issues to ship innovative solutions Superior."
        ]
    },
    {
        company: "CSULA University Times",
        role: "Front Stack Software Developer",
        date: "2019-2023",
        marks: [
            "Achieved impressive decrease of over 40% in web application loading times through the " +
            "strategic optimization of WordPress components using pure JavaScript, correlated with a " +
            "comprehensive backend server overhaul utilizing Node.js and PHP.",
            "Worked closely and harmoniously with team members to bring exceptional UI/UX designs to life and produced an increase of 40% score on great web accessibility.",
            "Organized the team of content creators to implement excellent SEO strategies, including the use of targeted keywords, resulting in a 25% increase in website traffic."
        ]
    },
    {
        company: "Army Lab Corporation",
        role: "Software Engineer Intern",
        date: "2022-2023",
        marks: [
            "Collaborated effectively with eight professionals to modernize an audio-visual detection model, crucial for private military contractor drone software used in combat scenarios.",
            "Python Software Transformation for Higher Performance: Transformed legacy software into modern Python, resulting in a remarkable 30% increase in computational speed.",
            "Pioneered the development of Unity Graphical User Interface (GUI) component for combat personnel, eliminating the need to view underlying code in real-time, optimizing user experience, and increased operational efficiency by 40%.",
            "Encompassed comprehensive project deliverables and focused on facilitating seamless knowledge transfer, establishing future scalability, and reduced codebase by 30%."
        ]
    }
]