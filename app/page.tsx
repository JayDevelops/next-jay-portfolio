import HomeHeader from "@/app/HomeHeader";
import dynamic from "next/dynamic";

export default function Home() {
    const DynamicComputer = dynamic(() => import("@/components/Models/Computer/Computer"), {
        loading: () => <p>Loading</p>
    })
    
    return (
        <div className="flex items-center justify-center md:h-screen">
          <section id="header" className="grid md:grid-cols-2 md:gap-4 mx-4 md:m-auto">
              <div className="h-[400px] md:w-full mx-auto">
                <DynamicComputer />
              </div>
              <HomeHeader />
          </section>
      </div>
  )
}
