import HomeHeader from "@/app/HomeHeader";
import Computer from "@/components/Models/Computer/Computer";

export default function Home() {
  return (
      <>
          <section id="header" className="grid md:grid-cols-2 md:gap-4 md:m-auto">
              <div className="h-[400px] md:w-full mx-auto">
                  <Computer />
              </div>
              <HomeHeader />
          </section>
      </>
  )
}
