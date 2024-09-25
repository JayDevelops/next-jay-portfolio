import {HeadingOne, HeadingTwo} from "@/components/ui/Typography/Headers";
import {Text} from "@/components/ui/Typography/Text";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {BackpackIcon, EnvelopeOpenIcon} from "@radix-ui/react-icons";

export default function HomeHeader() {
    return (
        <div className="-mt-36 md:m-0 px-12 text-muted-foreground">
            <HeadingOne className="text-left" color="primary">Jesus Perez</HeadingOne>
            <HeadingTwo className="text-xl">FullStack Developer</HeadingTwo>

            <div className="text-container space-y-4">
                <Text>
                    Based in Los Angeles, CA with over three years experience in MERN stack and Next.js,
                    crafting stunning dynamic full-stack web applications, and mobile app development.
                    I specialize in software solutions available for full-time and freelance work.
                </Text>
                <Text>
                    When I&apos;m not at my desk coding I enjoy playing video games, exploring new places, and writing.
                    Feel free to reach out to me, grab a coffee or work on any exciting projects.
                </Text>
            </div>

            <div className="mt-8 space-x-6">
                <Link href="/contact">
                    <Button className="hover:scale-110 transition-all ease-in-out duration-200">
                        <EnvelopeOpenIcon className="h-4 w-4"/> &nbsp; Contact Me
                    </Button>
                </Link>

                <Link href="/projects">
                    <Button className="hover:scale-110 transition-all ease-in-out duration-200" variant="secondary">
                        <BackpackIcon className="h-4 w-4"/> &nbsp; My Works
                    </Button>
                </Link>
            </div>
        </div>
    )
}