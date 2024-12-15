import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { HeadingOne } from "@/components/ui/Typography/Headers";
import { Text } from "@/components/ui/Typography/Text";

export function AboutMeHeader() {
  return (
    <section className="about-me-section my-2">
      <article className="space-y-2">
        <HeadingOne>
          Hello I&apos;m <span className="text-primary">Jesus Perez</span> and I
          am a <span className="text-primary">FullStack Developer.</span>
        </HeadingOne>

        <div className="text-container space-y-4 pb-2">
          <Text>
            My parents come from Michoacan, Mexico (not Michigan) came to
            Southern California in the 1990&apos;s, where I currently reside in
            Montebello, California. I bring extensive expertise in crafting
            dynamic web applications using cutting-edge technologies such as
            Next.js, ReactJS, PHP, ASP.NET, Wordpress and various more in my
            four plus years of being a FullStack Developer.
          </Text>

          <Text>
            Back in my high school days I was enrolled in a&nbsp;
            <Link
              href="https://www.mhscats.com/"
              className="text-primary hover:underline"
              target="_blank"
            >
              creative arts pathway program
            </Link>{" "}
            dedicated to animation and graphic design, from there I fell in love
            with design where I wanted to create web design. My animation
            teacher set me aside showing me his personal portfolio with some
            fancy jQuery animations.
          </Text>

          <Text>
            Peaking my curiosity into JavaScript land where I wrote my first
            line of JavaScript code, fast forward to today and the long and
            continuing path of pursuing my Bachelors in Computer Science and
            various roles to being a FullStack Developer widens,&nbsp;
            <Link href="/contact" className="text-primary hover:underline">
              contact me
            </Link>{" "}
            to bring me aboard to assist the shipping of your next product.
          </Text>
        </div>
        <DownloadResumeButton />
      </article>
    </section>
  );
}

export function DownloadResumeButton() {
  return (
    <Button asChild variant="outline">
      <Link
        href="/static/JesusPerez_SoftwareEngineer_Resume2024.pdf"
        target="_blank"
      >
        Download Resume&nbsp;
        <DownloadIcon />
      </Link>
    </Button>
  );
}
