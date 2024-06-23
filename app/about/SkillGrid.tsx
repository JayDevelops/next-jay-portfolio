"use client"
import {
    SiAdobexd,
    SiBlender,
    SiFigma,
    SiNextdotjs,
    SiPrisma,
    SiReact,
    SiRedux,
    SiShadcnui,
    SiTypescript
} from "react-icons/si";
import {FaDocker, FaMicrosoft, FaNodeJs, FaSwift} from "react-icons/fa";
import {RiJavascriptFill} from "react-icons/ri";
import {DiMysql} from "react-icons/di";
import SkillCard from "@/app/about/SkillCard";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

type SkillCategory = "all" | "web" | "design" | "mobile" | "cloud" | "backend";
export interface Skill {
    title: string,
    icon: JSX.Element,
    category: SkillCategory
}

export default function SkillGrid() {
    //  tracks the selected category, initially set to see "all"
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("all")

    //  updates the filtered skill array based on the user selected category
    const filteredSkills: Skill[] = selectedCategory === "all" ? skills : skills.filter(skill => skill.category === selectedCategory)

    //  maps through the categories to render in buttons and sets the selectedCategory
    const categories: SkillCategory[] = ["all", "web", "backend", "mobile", "cloud"]

    return (
        <div className="section-grid md:mt-6">
            <div className="grid grid-cols-5 md:gap-8 container invisible md:visible">
                {categories.map((category: SkillCategory, index: number) => (
                    <Button
                        key={index}
                        variant={`${selectedCategory === category ? 'default' : 'outline'}`}
                        className={cn(
                            "hover:bg-primary hover:text-primary-foreground hover:scale-[1.06] transition-all ease-in duration-100"
                        )}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                ))}
            </div>

            <div className="grid my-2 md:my-8 gap-4 grid-cols-2 md:grid-cols-3">
                {filteredSkills.map((skill: Skill, index: number) => (
                    <SkillCard key={index} skill={skill}/>
                ))}
            </div>
        </div>
    )
}

const skills: Skill[] = [
    {
        title: "Next.js",
        category: "web",
        icon: <SiNextdotjs className="h-8 w-8"/>,
    },
    {
        title: "React.js",
        category: "web",
        icon: <SiReact className="h-8 w-8" />,
    },
    {
        title: "ASP.NET",
        category: "web",
        icon: <FaMicrosoft className="h-8 w-8" />,
    },
    {
        title: "Docker",
        category: "cloud",
        icon: <FaDocker className="h-8 w-8" />
    },
    {
        title: "JavaScript",
        category: "web",
        icon: <RiJavascriptFill className="h-8 w-8" />
    },
    {
        title: "SQL",
        category: "backend",
        icon: <DiMysql className="h-8 w-8" />
    },
    {
        title: "NodeJS",
        category: "backend",
        icon: <FaNodeJs className="h-8 w-8" />
    },
    {
        title: "TypeScript",
        category: "backend",
        icon: <SiTypescript className="h-8 w-8" />
    },
    {
        title: "Swift",
        category: "mobile",
        icon: <FaSwift className="h-8 w-8" />
    },
    {
        title: "Prisma ORM",
        category: "backend",
        icon: <SiPrisma className="h-8 w-8" />
    },
    {
        title: "Redux",
        category: "web",
        icon: <SiRedux className="h-8 w-8" />
    },
    {
        title: "Adobe XD",
        category: "design",
        icon: <SiAdobexd className="h-8 w-8" />
    },
    {
        title: "Shadcn UI",
        category: "design",
        icon: <SiShadcnui className="h-8 w-8" />
    },
    {
        title: "Figma",
        category: "design",
        icon: <SiFigma className="h-8 w-8" />
    },
    {
        title: "Blender",
        category: "design",
        icon: <SiBlender className="h-8 w-8" />
    }
]
