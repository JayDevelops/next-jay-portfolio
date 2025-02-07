import HomeHeader from "@/app/HomeHeader";
import dynamic from "next/dynamic";
import HoverImage from "./PortfolioLandingImage";

export default function Home() {
  const mainPortfolioImageSource: string =
    "/images/portfolioCoverJayDevelops.jpg";
  const imageAlt: string = "Jesus focused on binary, Iron Man style";
  const author: string = "ChaosODed";
  const authorLink: string = "https://x.com/ChaosODed";

  return (
    <div className="flex items-center justify-center md:h-screen">
      <section
        id="header"
        className="grid md:grid-cols-2 md:gap-4 mx-4 md:m-auto"
      >
        <div className="h-[400px] md:w-full mx-auto">
          <HoverImage
            src={mainPortfolioImageSource}
            alt={imageAlt}
            author={author}
            authorLink={authorLink}
          />
        </div>
        <HomeHeader />
      </section>
    </div>
  );
}
