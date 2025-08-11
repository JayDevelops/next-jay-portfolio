import { HeadingOne, HeadingTwo } from "@/components/ui/Typography/Headers";
import { Text } from "@/components/ui/Typography/Text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackpackIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function HomeHeader() {
  return (
    <div className="text-muted-foreground">
      <HeadingOne className="text-left pb-2" color="primary">
        Jesus Perez
      </HeadingOne>
      <HeadingTwo className="font-normal text-secondary-foreground/90">
        Full Stack Developer
      </HeadingTwo>
      <div className="text-container space-y-4 mt-4">
        <Text>
          Based in Los Angeles, CA, I&apos;m a graduate student and a full-time
          software developer with over four years of experience in web
          technologies. I specialize in MERN stack and Next.js, crafting
          stunning dynamic full-stack web applications and mobile app
          development.
        </Text>
        <Text>
          Currently, I&apos;m focusing on software development professionally
          and machine learning, while continuing to work on exciting software
          projects. I&apos;m available for full-time and freelance
          opportunities.
        </Text>
        <Text>
          When I&apos;m not coding or studying, I enjoy playing video games,
          exploring new places, and writing. Feel free to contact me to chat or
          collaborate on any exciting projects.
        </Text>
      </div>
      <div className="mt-8 space-x-6">
        <Button
          className="hover:scale-110 transition-all ease-in-out duration-200"
          asChild
        >
          <Link href="/contact">
            <EnvelopeOpenIcon className="h-4 w-4" /> &nbsp; Contact Me
          </Link>
        </Button>
        <Button
          className="hover:scale-110 transition-all ease-in-out duration-200"
          variant="secondary"
        >
          <Link href="/projects">
            <BackpackIcon className="h-4 w-4" /> &nbsp; My Works
          </Link>
        </Button>
      </div>
    </div>
  );
}
