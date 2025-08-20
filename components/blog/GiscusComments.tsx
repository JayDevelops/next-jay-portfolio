"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function GiscusComments() {
  //  Switch giscus theme based on dark or light mode toggled
  const { theme } = useTheme();
  const giscusTheme = theme === "dark" ? "dark" : "light";

  return (
    <Giscus
      repo="JayDevelops/next-jay-portfolio"
      repoId="R_kgDOMA8GPw"
      category="Announcements"
      categoryId="DIC_kwDOMA8GP84Cf6_x"
      mapping="pathname"
      term="Welcome to Giscus!"
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="bottom"
      theme={giscusTheme}
      lang="en"
      loading="lazy"
    />
  );
}
