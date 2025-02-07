import HomeHeader from "@/app/HomeHeader";
import HoverImage from "@/app/PortfolioLandingImage";

export default function Home() {
  const mainPortfolioImageSource: string =
    "/images/portfolioCoverJayDevelops.jpg";
  const imageAlt: string = "Jesus focused on binary, Iron Man style";
  const author: string = "ChaosODed";
  const authorLink: string = "https://x.com/ChaosODed";

  return (
    <div className="flex items-center justify-center min-h-screen pt-2 pb-8 px-12 md:pt-0 md:pb-0 md:px-8">
      <section
        id="header"
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
      >
        <div className="order-1 md:order-none">
          <HoverImage
            src={mainPortfolioImageSource}
            alt={imageAlt}
            author={author}
            authorLink={authorLink}
          />
        </div>
        <div className="order-2 md:order-none">
          <HomeHeader />
        </div>
      </section>
    </div>
  );
}
