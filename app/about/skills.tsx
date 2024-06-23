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

type SkillCategory = "web" | "design" | "mobile" | "cloud" | "backend";

interface Skill {
    title: string,
    icon: JSX.Element,
    category: SkillCategory
}

const skills: Skill[] = [
    {
        title: "Next.js",
        category: "web",
        icon: <SiNextdotjs className="h-8 w-8" />,
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
export {skills};
export type { Skill, SkillCategory};
